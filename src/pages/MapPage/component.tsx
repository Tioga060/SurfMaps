import React, { CSSProperties } from 'react';
import get from 'lodash/get';
import Grid from '@material-ui/core/Grid';
import classnames from 'classnames';
import { IDisplayMap } from './types';
import { IEditImage } from 'shared/components/ImageDropzone';
import { MapBodyHeader } from './components/MapBodyHeader';
import { StageInfo } from './components/StageInfo';
import { HeaderImage } from './components/HeaderImage';
import { ImageList } from './components/ImageList';
import { DownloadCard } from './components/DownloadCard';
import { MapDescription } from './components/MapDescription';
import { MapContributors } from './components/MapContributors';
import { classNames as cn } from './styles';
import { hasImage } from './helpers';

interface IProps {
    map: IDisplayMap;
}

interface IState {
    headerImage: IEditImage;
}

const backgroundImageStyle = (image: IEditImage): CSSProperties => {
    const imageUrl = get(image, 'storeLocation');
    const imageFile = get(image, 'file');
    if (imageUrl) {
        return {
            backgroundImage: `url(${imageUrl})`,
        }
    }
    if (imageFile) {
        const url = URL.createObjectURL(imageFile)
        const style = {
            backgroundImage: `url(${url})`,
        }
        URL.revokeObjectURL(url);
        return style;
    }
    return {};
}

const getAllImages = (map: IDisplayMap): IEditImage[] => {
    const images: IEditImage[] = [];
    map.mainImage.forEach((image) => {
        if (hasImage(image)) {
            images.push(image);
        }
    });
    map.mapImages.forEach((image) => {
        if (hasImage(image)) {
            images.push(image);
        }
    });
    map.stages.forEach((stage) => {
        if(!!stage.images.length && hasImage(stage.images[0])) {
            images.push(stage.images[0]);
        }
    });

    return images;
}

const getDefaultImage = (map: IDisplayMap) => {
    const allImages = getAllImages(map);
    if (!!allImages.length) {
        return allImages[0];
    }
    return undefined;
}

export class MapPage extends React.Component<IProps, IState> {
    public constructor(props: IProps) {
        super(props);
        this.state = {
            headerImage: getDefaultImage(props.map)!,
        }

        this.setHeaderImage = this.setHeaderImage.bind(this);
    }

    public setHeaderImage(image: IEditImage) {
        this.setState({
            headerImage: image,
        })
    }

    public componentDidUpdate(prevProps: IProps) {
        if (prevProps.map !== this.props.map) {
            this.setState(() => ({
                headerImage: getDefaultImage(this.props.map)!,
            }));
        }
    }

    public render() {
        const backgroundImage = get(this.props.map.mainImage, '[0]') as IEditImage;
        return (
            <div
                className={classnames({
                    [cn.mapPageContainer]: true,
                    [cn.mapBackgroundImage]: !!backgroundImage
                })}
                style={backgroundImageStyle(backgroundImage!)}
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
                                {!!this.props.map.description.text.length && <MapDescription description={this.props.map.description.text} />}
                                {!!this.props.map.contributors.length &&
                                    <MapContributors contributors={this.props.map.contributors} />
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
                                {!!this.props.map.mapFiles.length && (
                                    <DownloadCard
                                        mapFiles={this.props.map.mapFiles}
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