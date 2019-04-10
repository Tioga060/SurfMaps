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

class MapCardComponent extends React.Component<IProps> {
    public render() {
        const map = this.props.map;
        return (
            <Card className='map-card'>
                <CardPrimaryContent>
                    <CardMedia wide imageUrl='http://puu.sh/DcrAi/6e3c7b259a.jpg' />
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

const MapCardContainer = createFragmentContainer(MapCardComponent, {
    map: graphql`
        fragment MapCardComponent_map on SurfMap {
            mapname
            author
            tier
        }
    `
})

interface temp {
    error: any;
    props: any;
}

export const MapCard: React.StatelessComponent = () => (
    <QueryRenderer
        environment={environment}
        query={
            graphql`
            query GetSurfMapById($mapId: ID!) {
                surfMap(id: $mapId) {
                    ...MapCardComponent_map
                }
            }
            `
        }
        variables={{mapId: "WyJTdXJmTWFwcyIsMl0="}}
        render={({ error, props }: temp) => {
            if (error) {
                return <div>{error.message}</div>;
            } else if (props) {
                return <MapCardContainer map={props.map} />;
            }
            return <div>Loading</div>;
        }}
    />
)