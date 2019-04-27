import React from 'react';
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';
import { classNames as cn } from '../../styles';

interface IProps {
    tier: number;
    updateTier: (e: any, tier: number) => void;
}

export const TierPicker: React.StatelessComponent<IProps> = (props) => (
    <>
        <Typography variant="h6">
            {`Tier ${props.tier}`}
        </Typography>
        <div className={cn.tierSliderContainer}>
            <Slider
                value={props.tier}
                min={1}
                max={6}
                step={1}
                onChange={props.updateTier}
            />
        </div>
    </>
);
