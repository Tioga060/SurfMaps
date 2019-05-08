import React, { CSSProperties } from 'react';
import get from 'lodash/get';
import Grid from '@material-ui/core/Grid';
import classnames from 'classnames';
import { IMap, IImage, IMapDescription } from 'shared/types';
import { MapBodyHeader } from './components/MapBodyHeader';
import { StageInfo } from './components/StageInfo';
import { HeaderImage } from './components/HeaderImage';
import { ImageList } from './components/ImageList';
import { DownloadCard } from './components/DownloadCard';
import { MapDescription } from './components/MapDescription';
import { MapContributors } from './components/MapContributors';
import { classNames as cn } from './styles';

interface IProps {
    map: IMap;
}

interface IState {
    headerImage: IImage | null;
}

const backgroundImageStyle = (imageUrl: string): CSSProperties => {
    return imageUrl
    ? { 
        backgroundImage: `url(${imageUrl})`,
    } : {};
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
    return images;
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

    public componentDidUpdate(prevProps: IProps) {
        if (prevProps.map !== this.props.map) {
            this.setState(() => ({
                headerImage: getDefaultImage(this.props.map),
            }));
        }
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
        return (
            <div
                className={classnames({
                    [cn.mapPageContainer]: true,
                    [cn.mapBackgroundImage]: !!backgroundImage
                })}
                style={backgroundImageStyle(backgroundImage)}
            >
                <div className={cn.mapPageBody}>
                    <MapBodyHeader map={this.props.map}/>
                    <Grid container spacing={16}>
                        <Grid item sm={5} xs={12}>
                            <Grid direction="column" container>
                                <StageInfo
                                    map={this.props.map}
                                    onStageClick={this.setHeaderImage}
                                />
                                {!!descriptions.length && descriptions.map((description, index) => (
                                    !!description.textMarkdownByTextMarkdownId.text.length && 
                                    <MapDescription key={index} description={description} />
                                ))}
                                {!!this.props.map.mapContributorsByMapId.nodes.length &&
                                    <MapContributors contributors={this.props.map.mapContributorsByMapId.nodes} />
                                }
                            </Grid>
                        </Grid>
                        <Grid item sm={7} xs={12}>
                            <Grid direction="column" container>
                                <div>
                                    <HeaderImage image={this.state.headerImage} />
                                </div>
                                <ImageList
                                    setHeaderImage={this.setHeaderImage}
                                    images={getAllImages(this.props.map)}
                                />
                                {!!this.props.map.mapFilesByMapId.nodes.length && (
                                    <DownloadCard
                                        mapFiles={this.props.map.mapFilesByMapId.nodes}
                                    />
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}