import React, { useState, useEffect } from 'react';
import { Route, match } from "react-router-dom";
import get from 'lodash/get';
import  { searchMapsByName } from './services/SearchMapGQL';
import { MapPageContainer } from './views/MapPage';
import { EditMap } from './views/EditMap';
interface IProps {
    match: match;
}

export const MapPageRouter: React.StatelessComponent<IProps> = ({match}) => (
    <>
        <Route path={`${match.url}/map/:mapInfo`} component={EditMapRouter}/>
        <Route path={`${match.url}/new`} component={EditMap}/>
    </>
);

const EditMapRouter: React.StatelessComponent<IProps> = ({match}) => {
    const [mapId, setMapId] = useState(undefined!);
    const [hasFetched, setHasFetched] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const mapInfo = get(match.params, 'mapInfo');
            console.log(mapInfo);
            if (!mapInfo) {
                setMapId(null!); // TODO - error state or go back to maps
            } else {
                const result = await searchMapsByName({text: mapInfo});
                console.log(result);
                setMapId(get(result, 'searchMapsByName.nodes[0].rowId'));
            }
        };
        if (!hasFetched) {
            fetchData();
        }
        setHasFetched(true);
    });

    return mapId ? (
        <MapPageContainer mapId={mapId} />
    ) : null;
};
