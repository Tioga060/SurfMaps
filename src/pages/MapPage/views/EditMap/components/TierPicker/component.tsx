import React from 'react';
import Slider from '@material-ui/lab/Slider';
import { Headline6 } from '@material/react-typography';
import { classNames as cn } from '../../styles';

interface IProps {
    tier: number;
    updateTier: (e: any, tier: number) => void;
}

export const TierPicker: React.StatelessComponent<IProps> = (props) => (
    <>
        <Headline6>
            {`Tier ${props.tier}`}
        </Headline6>
        <div className={cn.tierSliderContainer}>
            <Slider
                value={props.tier}
                min={1}
                max={6}
                step={1}
                onChange={props.updateTier}
                classes={{
                    trackBefore: cn.themeColorBackground,
                    trackAfter: cn.themeColorBackgroundSecondary,
                    thumb: cn.themeColorBackground,
                }}
            />
        </div>
    </>
);
