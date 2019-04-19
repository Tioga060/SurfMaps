import React, { CSSProperties } from 'react';
import get from 'lodash/get';
import { IMap } from '../../shared/types';
import { MapBodyHeader } from './components/MapBodyHeader/MapBodyHeader';
import './styles.scss';

interface IProps {
    map: IMap;
}

const backgroundImageStyle = (imageUrl: string): CSSProperties => {
    return imageUrl
    ? { 
        backgroundImage: `url(https://i.imgur.com/giwpZ86.jpg)`,
    } // TODO
    : {};
}

export class MapPage extends React.Component<IProps> {
    public render() {
        const images = this.props.map.images;
        const backgroundImage: string = images
            ? get(
                images.find((mapImage) => (!!mapImage.backgroundImage)),
                'image.storeLocation',
                null)
            : null;
        const bgClass = backgroundImage
            ? 'map-background-image'
            : '';
        return (
            <div className={`${bgClass} map-page-container`} style={backgroundImageStyle(backgroundImage)}>
                <div className="map-page-body">
                    <MapBodyHeader map={this.props.map}/>
                </div>
            </div>
        )
    }
}