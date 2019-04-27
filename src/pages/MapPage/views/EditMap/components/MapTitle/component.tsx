import React from 'react';
import TextField from '@material-ui/core/TextField';

interface IProps {
    value: string;
    updateMapName: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MapTitle: React.StatelessComponent<IProps> = (props) => (
    <div>
        <TextField
            label="Map Name"
            margin="dense"
            variant="outlined"
            value={props.value}
            onChange={props.updateMapName}
        />
    </div>
)
