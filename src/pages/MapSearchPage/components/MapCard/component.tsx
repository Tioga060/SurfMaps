import React from 'react';
import Card, {
    CardPrimaryContent,
    CardMedia,
} from "@material/react-card";
import {
    Headline6,
    Subtitle2,
} from '@material/react-typography';

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
