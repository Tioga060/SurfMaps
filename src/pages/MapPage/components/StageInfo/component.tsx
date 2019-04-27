import React from 'react';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import { IMap, IStage, IImage } from 'shared/types';
import { classNames as cn } from '../../styles'

const BONUS = 'bonus';
const STAGE = 'stage';

interface IProps {
    map: IMap;
    onStageClick: (image: IImage) => void;
}

const sortStages = (stageList: IStage[]) => {
    const [stages, bonuses] = stageList.reduce((result: IStage[][], stage) => {
        result[stage.stageTypeByStageTypeId.name.toLowerCase() === BONUS ? 1 : 0].push(stage);
        return result;
    }, [[], []]);

    return [
        ...stages.sort((a: IStage, b: IStage) => a.number - b.number),
        ...bonuses.sort((a: IStage, b: IStage) => a.number - b.number)
    ] as IStage[];
}

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
                {stages.map((stage) => {
                    const stageType = stage.stageTypeByStageTypeId.name.toLowerCase();
                    return (
                    <div
                        className={classnames({
                            [cn.stageBox]: true,
                            [cn.stageBoxColor]: stageType === STAGE,
                            [cn.bonusBoxColor]: stageType === BONUS,
                        })}
                        key={stage.rowId}
                        onClick={this.onStageClick(stage)}
                    >
                        <div className={classnames({
                            [cn.stageTriangle]: true,
                            [cn.stageTriangleColor]: stageType === STAGE,
                            [cn.bonusTriangleColor]: stageType === BONUS,
                        })} />
                        <div className={classnames(['d-flex', cn.stageText])}>
                            <Typography variant="body1" className="ml-3 position-absolute">
                                {`${stage.stageTypeByStageTypeId.name} ${stage.number}`}
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
