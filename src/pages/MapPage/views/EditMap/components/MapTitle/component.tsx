import React from 'react';
import TextField from '@material-ui/core/TextField';
import { IDisplayMap } from '../../../../types';

interface IProps {
    value: string;
    updateMap: (partialState: Partial<IDisplayMap>) => void;
}

const editMapName = (props: IProps) => (e: React.ChangeEvent<HTMLInputElement>) => {
    props.updateMap({
        mapName: e.target.value,
    });
};

export const MapTitle: React.StatelessComponent<IProps> = (props) => (
    <div>
        <TextField
            label="Map Name"
            margin="dense"
            variant="outlined"
            value={props.value}
            fullWidth
            onChange={editMapName(props)}
        />
    </div>
);
