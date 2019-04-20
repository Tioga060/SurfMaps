import React from 'react';
import { createFragmentContainer, QueryRenderer, graphql } from 'react-relay';
import environment from 'environment';

import { MapCard } from '../MapCard/mapcard';

import './styles.scss';

interface IMap {
    mapname: string;
    tier: number;
    author: string;
}

interface IMaps {
    maps: IMap[];
}

interface IProps {
    maps: IMaps;
}

export class MapCardList extends React.Component<IProps> {
    public render() {
        const maps = this.props.maps
            ? this.props.maps.maps
            : [];
        return (
            <div className="map-list">
                {maps.map((map: IMap) => (
                    <MapCard
                        key={map.mapname}
                        map={map}
                    />
                ))}
            </div>
        )
    }
}

const MapCardListContainer = createFragmentContainer(MapCardList, {
    maps: graphql`
        fragment mapcardlist_maps on SurfMapsConnection {
            maps: nodes {
                mapname
                author
                tier
            }
        }
    `
})

interface ISearchProps {
    searchText: string;
}

export class MapList extends React.Component<ISearchProps> {
    public render() {
        const searchText = this.props.searchText
            ? this.props.searchText
            : '';
        return (
            <QueryRenderer
                environment={environment}
                query={
                    graphql`
                        query mapcardlistGetMapsByTextQuery($searchText: String) {
                            searchMaps(search: $searchText) {
                                ...mapcardlist_maps
                            }
                        }
                    `
                }
                variables={{ searchText }}
                render={({ error, props }) => {
                    if (error) {
                        return <div>{error.message}</div>;
                    }
                    const maps: IMaps = props
                        ? props.searchMaps
                        : null;
                    return <MapCardListContainer maps={maps} />;
                }}
            />
        )
    }
}
