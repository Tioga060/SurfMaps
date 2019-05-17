import React from 'react';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import { IUserSteamInfo } from 'shared/types';
import { fetchSteamUser } from 'shared/resources/fetchSteamUser';
import { UserList, UserListForQuery } from '../UserList';

interface IProps {
    updateSteamUserList: (userList: IUserSteamInfo[]) => void;
    steamUserList: IUserSteamInfo[];
    descriptor: string;
}

interface IState {
    searchText: string;
    gqlText: string;
    fetching: boolean;
    result: IUserSteamInfo | null;
    hasFetched: boolean;
}

export class UserSearch extends React.Component<IProps, IState> {
    public constructor(props: IProps) {
        super(props);
        this.state = {
            searchText: '',
            gqlText: '',
            fetching: false,
            result: null,
            hasFetched: false,
        }
        this.setSearchText = this.setSearchText.bind(this);
        this.updateSteamUserList = this.updateSteamUserList.bind(this);
        this.setGQLText = debounce(this.setGQLText, 250);
    }

    public setGQLText(gqlText: string) {
        this.setState(() => ({
            gqlText
        }))
    }

    public setSearchText(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({searchText: event.target.value});
        this.setGQLText(event.target.value);
    }

    public updateSteamUserList = (userList: IUserSteamInfo[]) => {
        this.props.updateSteamUserList(userList);
        this.setState(() => ({
            result: null,
            hasFetched: false,
            searchText: '',
            gqlText: '',
        }));
    }

    public fetchSteamUser = async () => {
        this.setState(() => ({
            fetching: true,
            result: null,
            hasFetched: true,
        }))
        const user: IUserSteamInfo = await fetchSteamUser(this.state.searchText);
        if (get(user, 'numericSteamId', null)) {
            this.setState(() => ({
                fetching: false,
                result: user,
            }));
        } else {
            this.setState(() => ({
                fetching: false,
            }))
        }
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
                {this.state.gqlText.length > 1 && (
                    <UserListForQuery
                        steamUserList={this.state.result ? [this.state.result] : []}
                        queryText={this.state.gqlText}
                        updateSteamUserList={this.updateSteamUserList}
                        add
                        listToModify={this.props.steamUserList}
                    />
                )}
            </>
        )
    }
}
