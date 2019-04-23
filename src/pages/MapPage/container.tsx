import React from 'react';
import { QueryRenderer } from 'react-relay';
import {query} from './MapPageGQL';
import environment from 'environment';
import { MapPage } from './component';

export class MapPageContainer extends React.Component {
    public render() {
        return (
            <QueryRenderer
                environment={environment}
                query={query}
                variables={{mapId: "25728233-4e54-49ac-b78b-21aca6e3807b"}}
                render={({ error, props }) => {
                    if (error) {
                        return <div>{error.message}</div>;
                    }
                    if (!props) {
                        return <div>Missing props</div>
                    }
                    console.log(props);
                    return props.mapByRowId
                        ? <MapPage map={props.mapByRowId}/>
                        : <div>Error rendering map</div>
                }}
            />
        )
    }
}
