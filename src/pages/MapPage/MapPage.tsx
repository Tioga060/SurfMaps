import React, { CSSProperties } from 'react';
import get from 'lodash/get';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import { IMap } from 'shared/types';
import { MapBodyHeader } from './components/MapBodyHeader';
import { StageInfo } from './components/StageInfo';
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
                    <div className="map-body">
                        <Row>
                            <Cell columns={5}>
                                <StageInfo map={this.props.map}/>
                            </Cell>
                            <Cell columns={7}>
                                COL 2
                            </Cell>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}