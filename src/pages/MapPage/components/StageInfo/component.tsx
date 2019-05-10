import React from 'react';
import get from 'lodash/get';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import { IDisplayMap, IDisplayStage } from '../../types';
import { classNames as cn } from '../../styles'
import { STAGE_TYPES, sortStages, hasImage } from '../../helpers';
import { IEditImage } from 'shared/components/ImageDropzone';

interface IProps {
    map: IDisplayMap;
    onStageClick: (image: IEditImage) => void;
}

export class StageInfo extends React.Component<IProps> {
    public onStageClick = (stage: IDisplayStage) => () => {
        if (!!stage.images.length && hasImage(stage.images[0])) {
            this.props.onStageClick(stage.images[0]);
        }
    }

    public render() {
        const stages: IDisplayStage[] = sortStages(this.props.map.stages);
        return (
            <div className={cn.mapCard}>
                <Typography variant="h3">
                    {`${this.props.map.gameMode.name} - Tier ${this.props.map.tier}`}
                </Typography>
                <Typography variant="h6" className={cn.mapInfo}>
                    {this.props.map.game.name}
                </Typography>
                <Typography variant="h6" className={cn.mapInfo}>
                    {`${this.props.map.mapType.name} Map`}
                </Typography>
                {stages.map((stage, index) => {
                    const stageType = stage.stageType.name;
                    return (
                    <div
                        className={classnames({
                            [cn.stageBox]: true,
                            [cn.stageBoxColor]: stageType === STAGE_TYPES.STAGE || stageType === STAGE_TYPES.LINEAR,
                            [cn.bonusBoxColor]: stageType === STAGE_TYPES.BONUS,
                        })}
                        key={index}
                        onClick={this.onStageClick(stage)}
                    >
                        <div className={classnames({
                            [cn.stageTriangle]: true,
                            [cn.stageTriangleColor]: stageType === STAGE_TYPES.STAGE || stageType === STAGE_TYPES.LINEAR,
                            [cn.bonusTriangleColor]: stageType === STAGE_TYPES.BONUS,
                        })} />
                        <div className={classnames(['d-flex', cn.stageText])}>
                            <Typography variant="body1" className="ml-3 position-absolute">
                                {`${stage.stageType.name} ${stageType !== STAGE_TYPES.LINEAR ? stage.number : ''}`}
                            </Typography>
                            <Typography variant="body1" align="right" className="ml-auto mr-3">
                                {get(stage, 'authors[0].name', '')}
                            </Typography>
                        </div>
                    </div>
                )})}
            </div> 
        )
    }
    
}
