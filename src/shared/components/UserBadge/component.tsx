import React from 'react';
import Button from '@material/react-button';
import classnames from 'classnames';
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
                icon={<img className={classnames([{'icon-only-icon': !this.props.showName}, this.props.className])} src={steamUser.avatar} />}
                onClick={this.props.onPressed}
                className={classnames([{'icon-only-button': !this.props.showName}, this.props.className])}
            >
                {this.props.showName && (
                    `${steamUser.name}`
                )}
            </Button>
        ) : null;
    }
}
