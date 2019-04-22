import React from 'react';
import {
    Headline3,
    Headline6,
    Body1,
} from '@material/react-typography';

import { IMap, IStage, IImage } from 'shared/types';
import '../../styles.scss';
import './styles.scss';

const BONUS = 'bonus';

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
            <div className="map-card">
                <Headline3>
                    {`${this.props.map.gameModeByGameModeId.name} - Tier ${this.props.map.tier}`}
                </Headline3>
                <Headline6 className="info-sub-headers">
                    {this.props.map.gameByGameId.name}
                </Headline6>
                <Headline6 className="info-sub-headers">
                    {`${this.props.map.mapTypeByMapTypeId.name} Map`}
                </Headline6>
                {stages.map((stage) => (
                    <div
                        className={stage.stageTypeByStageTypeId.name ? `${stage.stageTypeByStageTypeId.name.toLowerCase()}-box` : 'stage-box'}
                        key={stage.rowId}
                        onClick={this.onStageClick(stage)}
                    >
                        <div className={stage.stageTypeByStageTypeId.name ? `${stage.stageTypeByStageTypeId.name.toLowerCase()}-triangle` : 'stage-triangle'} />
                        <Body1 className="stage-text">
                            {`${stage.stageTypeByStageTypeId.name} ${stage.number}`}
                        </Body1>
                        <Body1 className="stage-author">
                            {stage.userByAuthorId.userSteamInfosByUserId.nodes[0].name}
                        </Body1>
                    </div>
                ))}
            </div> 
        )
    }
    
}
