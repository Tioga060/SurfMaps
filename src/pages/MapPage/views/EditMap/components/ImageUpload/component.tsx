import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { ImageDropzone, IEditImage } from 'shared/components/ImageDropzone';
import { IState as IRootState, IEditStage } from '../EditMapDrawerContent/component';
import { classNames as cn } from '../../styles';

interface IProps {
    updateRootState: (partialState: Partial<IRootState>) => void;
    stages: IEditStage[];
    mapImages: IEditImage[];
    mainImage: IEditImage[];
}

const updateMapImages = (props: IProps) => (mapImages: IEditImage[]) => {
    props.updateRootState({mapImages})
}

const updateMainImage = (props: IProps) => (mainImage: IEditImage[]) => {
    props.updateRootState({mainImage})
}

const updateStageImages = (props: IProps, stageNumber: number) => (images: IEditImage[]) => {
    props.updateRootState({
        stages: [
            ...props.stages.slice(0, stageNumber),
            {
                ...props.stages[stageNumber],
                images,
            },
            ...props.stages.slice(stageNumber + 1),
        ]
    })
}

export const ImageUpload: React.StatelessComponent<IProps> = (props) => (
    <>
        <div className={cn.drawerCard}>
            <Typography variant="h6" align="center">
                Header + Background Image
            </Typography>
            <ImageDropzone files={props.mainImage} setFiles={updateMainImage(props)} singleImage/>
        </div>
        {!!props.stages.length && <div className={cn.drawerCard}>
            {props.stages.map((stage, index) => {
                return (
                    <div key={index}>
                        {index !== 0 && <Divider/>}
                        <Typography variant="h6" align="center">
                            {`${stage.stageType.name} ${stage.number > 0 ? stage.number : ''}`}
                        </Typography>
                        <ImageDropzone files={stage.images} setFiles={updateStageImages(props, index)} singleImage/>
                    </div>
                )
            })}
        </div>}
        <div className={cn.drawerCard}>
            <Typography variant="h6" align="center">
                Extra Map Images
            </Typography>
            <ImageDropzone files={props.mapImages} setFiles={updateMapImages(props)}/>
        </div>
    </>
);
