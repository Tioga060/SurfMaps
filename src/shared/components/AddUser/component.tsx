import React from 'react';
import Button from '@material/react-button';
import TextField, {Input} from '@material/react-text-field';

import { IUserSteamInfo } from 'shared/types';
import { ClosedState } from './components/ClosedState';
import { OpenState } from './components/OpenState';

import './styles.scss';

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
            <>
                {this.state.isOpen
                    ? (
                        <OpenState
                            open={this.toggleOpen}
                            steamUserList={this.props.steamUserList}
                            descriptor={this.props.descriptor}
                            updateSteamUserList={this.props.updateSteamUserList}
                        />
                    ) : (
                        <ClosedState open={this.toggleOpen} descriptor={this.props.descriptor} />
                    )}
            </>
        );
    }
}
