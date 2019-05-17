import React from 'react';
import get from 'lodash/get';
import { QueryRenderer } from 'react-relay';
import { query } from './UserListGQL';
import {environment} from 'shared/resources/graphql';
import { UserList, IProps } from './component';


type IContainerProps = IProps & {
    queryText: string;
}

export class UserListForQuery extends React.Component<IContainerProps> {
    public render() {
        return (
            <QueryRenderer
                environment={environment}
                query={query}
                variables={{search: this.props.queryText}}
                render={({ error, props }) => {
                    if (error) {
                        return <div>{error.message}</div>;
                    }
                    if (!props) {
                        return <span>Fetching ...</span>
                    }
                    if (get(props, 'searchSteamUsers.nodes', null)) {
                        const steamUserList = [
                            ...this.props.steamUserList,
                            ...props.searchSteamUsers.nodes,
                        ]
                        return !!steamUserList.length
                            ? <UserList 
                                steamUserList={steamUserList}
                                updateSteamUserList={this.props.updateSteamUserList}
                                add={this.props.add}
                                listToModify={this.props.listToModify}
                            />
                            : null
                    }
                    return <div>Error rendering user</div>
                }}
            />
        )
    }
}
