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
    singleUser?: boolean;
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

    public componentDidUpdate() {
        const shouldClose = this.props.singleUser && this.props.steamUserList.length > 0;
        if (this.state.isOpen && shouldClose) {
            this.toggleOpen();
        }
    }

    public toggleOpen = () => {
        const canOpen = !this.props.singleUser || this.props.steamUserList.length === 0;
        this.setState({isOpen: !this.state.isOpen && canOpen});
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
