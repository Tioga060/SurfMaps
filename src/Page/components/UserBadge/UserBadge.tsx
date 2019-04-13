import React from 'react';
import Button from '@material/react-button';
import { createFragmentContainer, QueryRenderer, graphql } from 'react-relay';
import environment from '../../../environment';
import { IUserSteamInfo } from '../../../shared/types';

import './styles.scss';

type IProps = IBadgeContainerProps & {
    steamUser: IUserSteamInfo;
}

export class UserBadge extends React.Component<IProps> {
    render() {
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

const CurrentUserBadgeContainer = createFragmentContainer(UserBadge, {
    steamUser: graphql`
        fragment UserBadge_steamUser on UserSteamInfo {
            name,
            profileUrl,
            timeCreated,
            avatar,
            avatarMedium,
            avatarFull,
            numericSteamId
        }
    `
})

interface IBadgeContainerProps {
    showName?: boolean;
    onPressed: () => void;
}

export class UserBadgeForSignedInUser extends React.Component<IBadgeContainerProps> {
    public render() {
        return (
            <QueryRenderer
                environment={environment}
                query={
                    graphql`
                        query UserBadge_getCurrentUserQuery {
                            currentUserSteamInfo {
                                ...UserBadge_steamUser
                            }
                        }
                    `
                }
                variables={{}}
                render={({ error, props }) => {
                    if (error) {
                        return <div>{error.message}</div>;
                    }
                    const steamUser: IUserSteamInfo = props
                        ? props.currentUserSteamInfo
                        : null;
                    return <CurrentUserBadgeContainer 
                                steamUser={steamUser}
                                onPressed={this.props.onPressed}
                                showName={this.props.showName}
                            />;
                }}
            />
        )
    }
}
