import React, { useState, useEffect } from 'react';
import { Route, match } from "react-router-dom";
import get from 'lodash/get';
import  { searchMapsByName, canEditMap } from './services/SearchMapGQL';
import { MapPageContainer } from './views/MapPage';
import { EditMap } from './views/EditMap';
interface IProps {
    match: match;
}

// TODO - return user to map list when they cannot edit a map
export const MapPageRouter: React.StatelessComponent<IProps> = ({match}) => (
    <>
        <Route path={`${match.url}/map/:mapInfo`} component={MapRouter}/>
        <Route path={`${match.url}/edit/:mapInfo`} component={EditMapRouter}/>
        <Route path={`${match.url}/new`} component={EditMap}/>
    </>
);

const EditMapRouter: React.StatelessComponent<IProps> = ({match}) => {
    const [mapId, setMapId] = useState(undefined!);
    const [canEdit, setCanEdit] = useState(false);
    const [hasFetchedMapInfo, setHasFetchedMapInfo] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const mapInfo = get(match.params, 'mapInfo');
            if (!mapInfo) {
                setMapId(null!); // TODO - error state or go back to maps
            } else {
                const result = await searchMapsByName({text: mapInfo});
                const mapid = await get(result, 'searchMapsByName.nodes[0].rowId');
                if (!!mapid) {
                    const canEditResult = await canEditMap({mapid});
                    setCanEdit(get(canEditResult, 'canUpdateMap', false));
                    setMapId(mapid);
                } else {
                    setMapId(null!);// TODO - error state or go back to maps
                }
            }
        };
        if (!hasFetchedMapInfo) {
            fetchData();
        }
        setHasFetchedMapInfo(true);
    });

    if (mapId) {
        if (canEdit) {
            return <EditMap mapId={mapId} />
        } else {
            return <MapPageContainer mapId={mapId} />
        }
    }
    return null;
}

const MapRouter: React.StatelessComponent<IProps> = ({match}) => {
    const [mapId, setMapId] = useState(undefined!);
    const [hasFetched, setHasFetched] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const mapInfo = get(match.params, 'mapInfo');
            if (!mapInfo) {
                setMapId(null!); // TODO - error state or go back to maps
            } else {
                const result = await searchMapsByName({text: mapInfo});
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
