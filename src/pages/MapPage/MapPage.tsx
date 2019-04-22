import React, { CSSProperties } from 'react';
import get from 'lodash/get';
import { Cell, Row } from '@material/react-layout-grid';
import { IMap, IImage, IMapDescription } from 'shared/types';
import { MapBodyHeader } from './components/MapBodyHeader';
import { StageInfo } from './components/StageInfo';
import { HeaderImage } from './components/HeaderImage';
import { ImageList } from './components/ImageList';
import { DownloadCard } from './components/DownloadCard';
import { MapDescription } from './components/MapDescription';
import { MapContributors } from './components/MapContributors';
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
    if (!map.mapImagesByMapId.nodes.length) {
        return null;
    }
    const headerImage = map.mapImagesByMapId.nodes.find((image) => !!image.primaryImage);
    return headerImage
        ? headerImage.imageByImageId
        : map.mapImagesByMapId.nodes[0].imageByImageId;
}

const getAllImages = (map: IMap): IImage[] => {
    const images: IImage[] = [];
    map.mapImagesByMapId.nodes.slice().sort((a, b) => a.order - b.order).map((mapImage) => {
        images.push(mapImage.imageByImageId);
    });
    map.stagesByMapId.nodes.slice().sort((a, b) => a.number - b.number).map((stage) => {
        stage.stageImagesByStageId.nodes.map((image) => {
            images.push(image.imageByImageId)
        })
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
        const descriptions: IMapDescription[] =
            this.props.map.mapDescriptionsByMapId.nodes.sort((a, b) => a.order - b.order);
        const images = this.props.map.mapImagesByMapId.nodes;
        const backgroundImage: string = images.length
            ? get(
                images.find((mapImage) => (!!mapImage.backgroundImage)),
                'imageByImageId.storeLocation',
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
                                {descriptions.map((description) => (
                                    <MapDescription description={description} />
                                ))}
                                <MapContributors contributors={this.props.map.mapContributorsByMapId.nodes} />
                            </Cell>
                            <Cell columns={7}>
                                <HeaderImage image={this.state.headerImage} />
                                <ImageList
                                    setHeaderImage={this.setHeaderImage}
                                    images={getAllImages(this.props.map)}
                                />
                                {this.props.map.mapFilesByMapId.nodes.length && (
                                    <DownloadCard
                                        mapFiles={this.props.map.mapFilesByMapId.nodes}
                                    />
                                )}
                            </Cell>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}