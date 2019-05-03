import React from 'react';
import { createFragmentContainer, QueryRenderer, graphql } from 'react-relay';
import environment from 'shared/resources/graphql';
import { UserBadge } from './component';
import { IUserSteamInfo } from 'shared/types';

const CurrentUserBadgeContainer = createFragmentContainer(UserBadge, {
    steamUser: graphql`
    fragment UserBadgeContainer_steamUser on UserSteamInfo {
        name,
        profileUrl,
        timeCreated,
        avatar,
        avatarMedium,
        avatarFull,
        numericSteamId,
        userId
    }
    `
})

export interface IBadgeContainerProps {
    showName?: boolean;
    onPressed?: () => void;
    className?: string;
}

export class UserBadgeForSignedInUser extends React.Component<IBadgeContainerProps> {
    public render() {
        return (
            <QueryRenderer
                environment={environment}
                query={graphql`
                query UserBadgeContainer_getCurrentUserQuery {
                    currentUserSteamInfo {
                        ...UserBadgeContainer_steamUser
                    }
                }
                `}
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
                                className={this.props.className}
                            />;
                }}
            />
        )
    }
}