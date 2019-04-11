import React from 'react';
import Card, {
    CardPrimaryContent,
    CardMedia,
} from "@material/react-card";
import {
    Headline6,
    Subtitle2,
} from '@material/react-typography';
import { createFragmentContainer, QueryRenderer, graphql } from 'react-relay';
//const { createFragmentContainer, QueryRenderer, graphql } = require('babel-plugin-relay/macro');
import environment from '../../../../environment';

import './styles.scss';

interface IMap {
    mapname: string;
    tier: number;
    author: string;
}

interface IProps {
    map: IMap;
}

export class MapCard extends React.Component<IProps> {
    public render() {
        const map = this.props.map;
        return (
            <Card className='map-card'>
                <CardPrimaryContent>
                    <CardMedia className="map-image" wide imageUrl={`${process.env.PUBLIC_URL}/dev/${map.mapname}.jpg`}/>
                    <div className="map-primary">
                        <Headline6 className='map-title'>
                            {map.mapname}
                        </Headline6>
                        <Subtitle2 className='map-subtitle'>
                            {`${map.author} | ${map.tier}`}
                        </Subtitle2>
                    </div>
                </CardPrimaryContent>

            </Card>
        )
    }
}

/*
const MapCardContainer = createFragmentContainer(MapCardComponent, {
    map: graphql`
        fragment mapcard_map on SurfMap {
            mapname
            author
            tier
        }
    `
})

const defaultMap: IMap = {
    mapname: "Loading...",
    author: "Loading...",
    tier: 0,
}

export const MapCard: React.StatelessComponent = () => (
    <QueryRenderer
        environment={environment}
        query={
            graphql`
                query mapcardGetSurfMapByIdQuery($mapId: ID!) {
                    surfMap(id: $mapId) {
                        ...mapcard_map
                    }
                }
            `
        }
        variables={{mapId: "WyJTdXJmTWFwcyIsMl0="}}
        render={({ error, props }) => {
            if (error) {
                return <div>{error.message}</div>;
            }
            const map: IMap = props
                ? props.surfMap
                : defaultMap
            return <MapCardContainer map={map}/>;
        }}
    />
)
*/
