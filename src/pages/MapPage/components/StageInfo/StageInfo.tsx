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
    const stages = stageList.filter((stage) => stage.stageType.toLowerCase() !== BONUS);
    const bonuses = stageList.filter((stage) => stage.stageType.toLowerCase() === BONUS);

    return [
        ...stages.sort((a: IStage, b: IStage) => a.number - b.number),
        ...bonuses.sort((a: IStage, b: IStage) => a.number - b.number)
    ] as IStage[];
}

export class StageInfo extends React.Component<IProps> {
    public onStageClick = (stage: IStage) => () => {
        if (stage.images) {
            this.props.onStageClick(stage.images[0]);
        }
    }

    public render() {
        const stages: IStage[] = this.props.map.stages
            ? sortStages(this.props.map.stages)
            : [];
        return (
            <div className="map-card">
                <Headline3>
                    {`${this.props.map.gameMode} - Tier ${this.props.map.tier}`}
                </Headline3>
                <Headline6 className="info-sub-headers">
                    {this.props.map.game}
                </Headline6>
                <Headline6 className="info-sub-headers">
                    {`${this.props.map.mapType} Map`}
                </Headline6>
                {stages.map((stage) => (
                    <div
                        className={stage.stageType ? `${stage.stageType.toLowerCase()}-box` : 'stage-box'}
                        key={stage.id}
                        onClick={this.onStageClick(stage)}
                    >
                        <div className={stage.stageType ? `${stage.stageType.toLowerCase()}-triangle` : 'stage-triangle'} />
                        <Body1 className="stage-text">
                            {`${stage.stageType} ${stage.number}`}
                        </Body1>
                        <Body1 className="stage-author">
                            {stage.author!.name}
                        </Body1>
                    </div>
                ))}
            </div> 
        )
    }
    
}
