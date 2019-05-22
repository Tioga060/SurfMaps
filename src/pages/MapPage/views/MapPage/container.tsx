import React from 'react';
import { QueryRenderer } from 'react-relay';
import {query} from './MapPageGQL';
import { environment } from 'shared/resources/graphql';
import { RootContext } from 'shared/context';
import { MapPage } from './component';
import { convertIMapToEditState } from '../../helpers';
interface IProps {
    mapId: string;
}

export class MapPageContainer extends React.Component<IProps> {
    public render() {
        return (
            <RootContext.Consumer>
                {({setSidebarIsOpen}) => (
                    <QueryRenderer
                        environment={environment}
                        query={query}
                        variables={{mapId: this.props.mapId}}
                        render={({ error, props }) => {
                            setSidebarIsOpen(false);
                            if (error) {
                                return <div>{error.message}</div>;
                            }
                            if (!props) {
                                return <div>Missing props</div>
                            }
                            return props.mapByRowId
                                ? <MapPage map={convertIMapToEditState(props.mapByRowId)}/>
                                : <div>Error rendering map</div>
                        }}
                    />
                )}
            </RootContext.Consumer>
        )
    }
}
