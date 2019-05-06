import React from 'react';
import { QueryRenderer } from 'react-relay';
import {query} from './EditMapGQL';
import environment from 'shared/resources/graphql';
import { EditMapDrawerContent, IState as IEditMapState } from './component';
import * as T from 'shared/types';

export interface IEditMapContext {
    allMapTypes: T.IMapTypeAsNodes;
    allGameModes: T.IGameModeAsNodes;
    allGames: T.IGameAsNodes;
    allStageTypes: T.IStageTypeAsNodes;
    currentUserSteamInfo: T.IUserSteamInfo;
}

export interface IProps {
    setCurrentMap: (map: T.IMap) => void;
    mode: number;
    refreshMap: (mapId: string) => void;
    mapState?: Partial<IEditMapState>;
}

export class EditMapDrawerContainer extends React.Component<IProps> {
    public render() {
        return (
            <QueryRenderer
                environment={environment}
                query={query}
                variables={{}}
                render={({ error, props }) => {
                    if (error) {
                        return <div>{error.message}</div>;
                    }
                    if (!props) {
                        return <div>Missing props</div>
                    }
                    return props
                        ? <EditMapDrawerContent
                            context={props as IEditMapContext}
                            setCurrentMap={this.props.setCurrentMap}
                            mode={this.props.mode}
                            refreshMap={this.props.refreshMap}
                            mapState={this.props.mapState}
                        />
                        : <div>Error rendering sidebar</div>
                }}
            />
        )
    }
}
