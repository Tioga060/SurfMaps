import React from 'react';
import Slider from '@material-ui/lab/Slider';
import { Headline6 } from '@material/react-typography';
import './styles.scss';

interface IProps {
    tier: number;
    updateTier: (e: any, tier: number) => void;
}

export const TierPicker: React.StatelessComponent<IProps> = (props) => (
    <>
        <Headline6>
            {`Tier ${props.tier}`}
        </Headline6>
        <div className="tier-slider-container">
            <Slider
                value={props.tier}
                min={1}
                max={6}
                step={1}
                onChange={props.updateTier}
                classes={{
                    trackBefore: 'theme-background-color',
                    trackAfter: 'theme-background-color-transparent',
                    thumb: 'theme-background-color',
                }}
            />
        </div>
    </>
);
