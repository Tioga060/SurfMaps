import React from 'react';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import { IMap, IStage, IImage } from 'shared/types';
import { classNames as cn } from '../../styles'
import { STAGE_TYPES } from '../../views/EditMap/helpers';

interface IProps {
    map: IMap;
    onStageClick: (image: IImage) => void;
}

export const sortStages = (stageList: IStage[]) => {
    const [stages, bonuses] = stageList.reduce((result: IStage[][], stage) => {
        result[stage.stageTypeByStageTypeId.name === STAGE_TYPES.BONUS ? 1 : 0].push(stage);
        return result;
    }, [[], []]);

    return [
        ...stages.sort((a: IStage, b: IStage) => a.number - b.number),
        ...bonuses.sort((a: IStage, b: IStage) => a.number - b.number)
    ] as IStage[];
};

export class StageInfo extends React.Component<IProps> {
    public onStageClick = (stage: IStage) => () => {
        if (stage.stageImagesByStageId.nodes.length) {
            this.props.onStageClick(stage.stageImagesByStageId.nodes[0].imageByImageId);
        }
    }

    public render() {
        const stages: IStage[] = sortStages(this.props.map.stagesByMapId.nodes);
        return (
            <div className={cn.mapCard}>
                <Typography variant="h3">
                    {`${this.props.map.gameModeByGameModeId.name} - Tier ${this.props.map.tier}`}
                </Typography>
                <Typography variant="h6" className={cn.mapInfo}>
                    {this.props.map.gameByGameId.name}
                </Typography>
                <Typography variant="h6" className={cn.mapInfo}>
                    {`${this.props.map.mapTypeByMapTypeId.name} Map`}
                </Typography>
                {stages.map((stage, index) => {
                    const stageType = stage.stageTypeByStageTypeId.name;
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
                                {`${stage.stageTypeByStageTypeId.name} ${stageType !== STAGE_TYPES.LINEAR ? stage.number : ''}`}
                            </Typography>
                            <Typography variant="body1" align="right" className="ml-auto mr-3">
                                {stage.userByAuthorId.userSteamInfosByUserId.nodes[0].name}
                            </Typography>
                        </div>
                    </div>
                )})}
            </div> 
        )
    }
    
}
