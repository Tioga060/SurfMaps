import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import DateFnsUtils from "@date-io/date-fns";
import {
    DatePicker,
    MuiPickersUtilsProvider,
} from "material-ui-pickers";
import { IDisplayMap } from '../../../../types';

interface IProps {
    releaseDate: string;
    updateMap: (partialState: Partial<IDisplayMap>) => void;
}

const handleDateChange = (props: IProps) => (date: Date) => {
    props.updateMap({
        releaseDate: date.toString(),
    });
};

export const ReleaseDate: React.StatelessComponent<IProps> = (props) => {
    const [released, setReleased] = useState(false);
    const updateReleased = (event: React.ChangeEvent<HTMLInputElement>) => {
        const releaseDate = event.target.checked ? (new Date()).toString() : '';
        props.updateMap({
            releaseDate,
        })
        setReleased(event.target.checked)
    }
    return (
        <div>
            <div className="d-flex">
                <Typography variant="body1" align="center">
                    Has this map already been released?
                </Typography>
                <Switch checked={released} onChange={updateReleased} />
            </div>
            {released && (<div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <div className="pickers">
                        <DatePicker value={new Date(props.releaseDate)} onChange={handleDateChange(props)} label="Release Date" fullWidth/>
                    </div>
                </MuiPickersUtilsProvider>
            </div>)}
        </div>
    );
};
