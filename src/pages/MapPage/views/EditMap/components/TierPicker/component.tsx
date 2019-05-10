import React from 'react';
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';
import { IDisplayMap } from '../../../../types';

interface IProps {
    tier: number;
    updateMap: (partialState: Partial<IDisplayMap>) => void;
}

const updateTier = (props: IProps) => (e: any, tier: number) => {
    props.updateMap({
        tier,
    })
}

export const TierPicker: React.StatelessComponent<IProps> = (props) => (
    <>
        <Typography variant="h6">
            Map Info
        </Typography>
        <div className="d-flex">
            <Typography variant="h6">
                {`Tier ${props.tier}`}
            </Typography>
            <div className="p-3 flex-grow-1">
                <Slider
                    value={props.tier}
                    min={1}
                    max={6}
                    step={1}
                    onChange={updateTier(props)}
                />
            </div>
        </div>
    </>
);
