import React from 'react';
import { createFragmentContainer, QueryRenderer, graphql } from 'react-relay';
import {environment} from 'shared/resources/graphql';
import { MapCardList, IMaps } from './component';

const MapCardListContainer = createFragmentContainer(MapCardList, {
    maps: graphql`
    fragment MapCardListContainer_maps on SurfMapsConnection {
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
                        query MapCardListContainer_GetMapsByTextQuery($searchText: String) {
                            searchMaps(search: $searchText) {
                                ...MapCardListContainer_maps
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

