import React from 'react';

import { MapCard } from '../MapCard';

import './styles.scss';

interface IMap {
    mapname: string;
    tier: number;
    author: string;
}

export interface IMaps {
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
