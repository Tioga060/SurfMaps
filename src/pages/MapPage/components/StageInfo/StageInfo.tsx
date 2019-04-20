import React from 'react';
import {
    Headline3,
    Headline6,
    Body1,
} from '@material/react-typography';

import { IMap } from 'shared/types';
import '../../styles.scss';
import './styles.scss';

interface IProps {
    map: IMap;
}

export class StageInfo extends React.Component<IProps> {
    public render() {
        return (
            <div className="map-card">
                <Headline3>
                    {`${this.props.map.gameMode} - Tier ${this.props.map.tier}`}
                </Headline3>
                <Headline6 className="info-sub-headers">
                    {this.props.map.game}
                </Headline6>
                <Headline6 className="info-sub-headers">
                    {this.props.map.mapType}
                </Headline6>
                {this.props.map.stages!.map((stage) => (
                    <div className={stage.stageType ? `${stage.stageType.toLowerCase()}-box` : 'stage-box'}>
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
