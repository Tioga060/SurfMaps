import React from 'react';
import get from 'lodash/get';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import AddToPhotos from '@material-ui/icons/AddToPhotos';
import TextField from '@material-ui/core/TextField';
import { IUserSteamInfo } from 'shared/types';
import { fetchSteamUser } from 'shared/resources/fetchSteamUser';
import { UserBadge } from 'shared/components/UserBadge';

interface IProps {
    updateSteamUserList: (userList: IUserSteamInfo[]) => void;
    steamUserList: IUserSteamInfo[];
    descriptor: string;
}

interface IState {
    searchText: string;
    fetching: boolean;
    result: IUserSteamInfo | null;
    hasFetched: boolean;
}

export class UserSearch extends React.Component<IProps, IState> {
    public constructor(props: IProps) {
        super(props);
        this.state = {
            searchText: '',
            fetching: false,
            result: null,
            hasFetched: false,
        }
        this.setSearchText = this.setSearchText.bind(this);
    }

    public setSearchText(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({searchText: event.target.value});
    }

    public updateSteamUserList = () => {
        if (this.state.result) {
            const steamIds = this.props.steamUserList.map(user => (user.numericSteamId));
            if (steamIds.includes(this.state.result.numericSteamId)) {
                this.setState(() => ({
                    result: null,
                    hasFetched: false,
                    searchText: ''
                }));
                return;
            }
            this.props.updateSteamUserList([
                ...this.props.steamUserList,
                this.state.result
            ])
            this.setState(() => ({
                result: null,
                hasFetched: false,
                searchText: ''
            }))
        }
    }

    public fetchSteamUser = () => {
        this.setState(() => ({
            fetching: true,
            result: null,
            hasFetched: true,
        }))
        fetchSteamUser(this.state.searchText, (user: IUserSteamInfo | null) => {
            if (user) {
                if(get(user, 'numericSteamId', null))
                this.setState(() => ({
                    fetching: false,
                    result: user,
                }))
            } else {
                this.setState(() => ({
                    fetching: false,
                }))
            }
        })
    }

    public render() {
        return (
            <>
                <Divider/>
                <Typography variant="body1" align="center" className="mt-2">
                    {`Add ${this.props.descriptor}`}
                </Typography>
                <div className="d-flex ml-2">
                    <TextField
                        label="SteamID64"
                        margin="dense"
                        variant="outlined"
                        value={this.state.searchText}
                        onChange={this.setSearchText}
                    />
                    <div className="pt-2">
                    <IconButton onClick={this.fetchSteamUser}>
                        <Search/>
                    </IconButton>
                    </div>
                </div>
                <Divider/>
                <div className="d-flex justify-content-left pb-1">
                    <div className="ml-2 mt-2">
                        {this.state.hasFetched
                            ? (
                                this.state.fetching
                                    ? (
                                        <Typography variant="body1" align="left" className="mt-1 ml-2">Fetching...</Typography>
                                    ) : (
                                        this.state.result
                                            ? (
                                                <UserBadge showName steamUser={this.state.result} />
                                            ) : (
                                                <Typography variant="body1" align="left" className="mt-1 ml-2">No results found</Typography>
                                            )
                                    )
                            ) : (
                                <Typography variant="body1" align="left" className="mt-1 ml-2">Search Results</Typography>
                            )
                        }
                    </div>
                    <IconButton className="ml-auto" onClick={this.updateSteamUserList}>
                        <AddToPhotos/>
                    </IconButton>
                </div>
            </>
        )
    }
}
