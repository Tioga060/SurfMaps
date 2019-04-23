import React from 'react';
import Button from '@material/react-button';

import { IUserSteamInfo } from 'shared/types';
import { IBadgeContainerProps } from './UserBadgeContainer';

import './styles.scss';

type IProps = IBadgeContainerProps & {
    steamUser: IUserSteamInfo;
}

export class UserBadge extends React.Component<IProps> {
    public render() {
        const steamUser = this.props.steamUser;
        return steamUser ? (
            <Button
                raised
                icon={<img className={this.props.showName ? '' : 'icon-only-icon'} src={steamUser.avatar} />}
                onClick={this.props.onPressed}
                className={this.props.showName ? '' : 'icon-only-button'}
            >
                {this.props.showName && (
                    `${steamUser.name}`
                )}
            </Button>
        ) : null;
    }
}
