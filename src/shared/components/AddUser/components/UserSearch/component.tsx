import React from 'react';
import get from 'lodash/get';
import { Body1 } from '@material/react-typography';
import IconButton from '@material/react-icon-button';
import MaterialIcon from '@material/react-material-icon';
import TextField, {Input} from '@material/react-text-field';
import { IUserSteamInfo } from 'shared/types';
import { fetchSteamUser } from 'shared/resources/fetchSteamUser';
import { UserBadge } from 'shared/components/UserBadge';

import './styles.scss';
import '../../styles.scss';

interface IProps {
    updateSteamUserList: (userList: IUserSteamInfo[]) => void;
    steamUserList: IUserSteamInfo[];
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
                <div className="search-box-container">
                    <TextField
                        className="user-search-box"
                        label='SteamID64'
                        dense
                    >
                        <Input
                            value={this.state.searchText}
                            onChange={this.setSearchText}
                        />
                    </TextField>
                    <IconButton className="pull-right search-icon-container" onClick={this.fetchSteamUser}>
                        <MaterialIcon className="icon-color" icon='search' />
                    </IconButton>
                </div>
                <hr className="small-hr"/>
                <div className="search-box-container">
                    <div className="user-badge">
                        {this.state.hasFetched
                            ? (
                                this.state.fetching
                                    ? (
                                        <Body1 className="error-text">Fetching...</Body1>
                                    ) : (
                                        this.state.result
                                            ? (
                                                <UserBadge showName steamUser={this.state.result} />
                                            ) : (
                                                <Body1 className="error-text">No results found</Body1>
                                            )
                                    )
                            ) : (
                                <Body1 className="error-text">Search Results</Body1>
                            )
                        }
                    </div>
                    <IconButton className="pull-right search-icon-container" onClick={this.updateSteamUserList}>
                        <MaterialIcon className="icon-color" icon='library_add'/>
                    </IconButton>
                </div>
            </>
        )
    }
}
