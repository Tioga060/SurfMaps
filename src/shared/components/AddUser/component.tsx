import React from 'react';
import { IUserSteamInfo } from 'shared/types';
import { AddUserHeader } from './components/AddUserHeader';
import { UserSearch } from './components/UserSearch';
import { classNames as cn } from './styles';
import { UserList } from './components/UserList';

type IProps = {
    steamUserList: IUserSteamInfo[];
    updateSteamUserList: (userList: IUserSteamInfo[]) => void;
    descriptor: string;
}

type IState = {
    isOpen: boolean;
}

export class AddUser extends React.Component<IProps, IState> {
    public constructor(props: IProps) {
        super(props);
        this.state = {
            isOpen: false,
        }
    }

    public toggleOpen = () => {
        this.setState({isOpen: !this.state.isOpen});
    }

    public render() {
        return (
            <div className={cn.addUserContainer}>
                <AddUserHeader isOpen={this.state.isOpen} open={this.toggleOpen} descriptor={this.props.descriptor} />
                {this.state.isOpen
                    ? (
                        <UserSearch
                            updateSteamUserList={this.props.updateSteamUserList}
                            steamUserList={this.props.steamUserList}
                            descriptor={this.props.descriptor}
                        />
                    ) : null}
                {!!this.props.steamUserList.length && (
                    <UserList
                        steamUserList={this.props.steamUserList}
                        updateSteamUserList={this.props.updateSteamUserList}
                    />
                )}
            </div>
        );
    }
}
