import React from 'react';
import debounce from 'lodash/debounce';
import { QueryRenderer } from 'react-relay';
import { RootContext } from 'shared/context';
import { query } from '../MapPage/MapPageGQL';
import { environment } from 'shared/resources/graphql';
import { EditMap } from './component';

interface IProps {
    mapId?: string;
}

interface IState {
    mapId: string | undefined;
}

export class EditMapContainer extends React.Component<IProps, IState> {
    public constructor(props: IProps) {
        super(props);
        this.state = {
            mapId: props.mapId,
        }
        this.refreshMap = debounce(this.refreshMap.bind(this), 250);
    }

    public refreshMap = (mapId: string) => {
        this.setState(() => ({
            mapId,
        }));
    }

    public render() {
        return (
            <RootContext.Consumer>
                {({setSidebarIsOpen}) => (
                    <QueryRenderer
                        environment={environment}
                        query={query}
                        variables={{mapId: this.state.mapId}}
                        render={({ error, props }) => {
                            setSidebarIsOpen(true);
                            if (error || !props) {
                                return <EditMap refreshMap={this.refreshMap}/>
                            }
                            return <EditMap map={props.mapByRowId} refreshMap={this.refreshMap}/>
                        }}
                    />
                )}
            </RootContext.Consumer>
        )
    }
}
