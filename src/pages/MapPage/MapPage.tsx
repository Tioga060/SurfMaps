import React, { CSSProperties } from 'react';
import get from 'lodash/get';
import { Cell, Row } from '@material/react-layout-grid';
import { IMap, IImage } from 'shared/types';
import { MapBodyHeader } from './components/MapBodyHeader';
import { StageInfo } from './components/StageInfo';
import { HeaderImage } from './components/HeaderImage';
import { ImageList } from './components/ImageList';
import './styles.scss';

interface IProps {
    map: IMap;
}

interface IState {
    headerImage: IImage | null;
}

const backgroundImageStyle = (imageUrl: string): CSSProperties => {
    return imageUrl
    ? { 
        backgroundImage: `url(https://i.imgur.com/giwpZ86.jpg)`,
    } // TODO
    : {};
}

const getDefaultImage = (map: IMap) => {
    if (!map.images) {
        return null;
    }
    const headerImage = map.images.find((image) => !!image.primaryImage);
    return headerImage
        ? headerImage.image
        : map.images[0].image;
}

const getAllImages = (map: IMap): IImage[] => {
    const images: IImage[] = [];
    map.images!.sort((a, b) => a.order - b.order).map((mapImage) => {
        images.push(mapImage.image);
    });
    map.stages!.sort((a, b) => a.number - b.number).map((stage) => {
        if (stage.images) {
            stage.images.map((image) => {
                images.push(image)
            })
        }
    });
    return images.concat(images);
}

export class MapPage extends React.Component<IProps, IState> {
    public constructor(props: IProps) {
        super(props);
        this.state = {
            headerImage: getDefaultImage(props.map),
        }

        this.setHeaderImage = this.setHeaderImage.bind(this);
    }

    public setHeaderImage(image: IImage) {
        this.setState({
            headerImage: image,
        })
    }

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
                    <div>
                        <Row>
                            <Cell columns={5}>
                                <StageInfo
                                    map={this.props.map}
                                    onStageClick={this.setHeaderImage}
                                />
                            </Cell>
                            <Cell columns={7}>
                                <HeaderImage image={this.state.headerImage} />
                                <ImageList
                                    setHeaderImage={this.setHeaderImage}
                                    images={getAllImages(this.props.map)}
                                />
                            </Cell>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}