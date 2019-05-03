import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { ImageDropzone } from 'shared/components/ImageDropzone';
import { IState as IRootState, IEditStage } from '../EditMapDrawerContent/component';
import { classNames as cn } from '../../styles';
import { getStageTypeAndNumber } from '../Stages';

interface IProps {
    updateRootState: (partialState: Partial<IRootState>) => void;
    stages: IEditStage[];
    mapImages: File[];
    mainImage: File[];
}

const updateMapImages = (props: IProps) => (mapImages: File[]) => {
    props.updateRootState({mapImages})
}

const updateMainImage = (props: IProps) => (mainImage: File[]) => {
    props.updateRootState({mainImage})
}

const updateStageImages = (props: IProps, stageNumber: number) => (images: File[]) => {
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
                const {stageTypeName, stageNumber} = getStageTypeAndNumber(props.stages, stage, index);
                return (
                    <>
                        {index !== 0 && <Divider/>}
                        <Typography variant="h6" align="center">
                            {`${stageTypeName} ${stageNumber}`}
                        </Typography>
                        <ImageDropzone files={stage.images} setFiles={updateStageImages(props, index)} singleImage/>
                    </>
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
