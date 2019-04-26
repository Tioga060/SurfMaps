import React from 'react';
import TextField from '@material-ui/core/TextField';
import { classNames as cn } from '../../styles';

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
            InputProps={{
                classes: {
                    input: cn.textColor,
                    notchedOutline: cn.themeBorder,
                }
            }}
            InputLabelProps={{
                classes: {
                    root: cn.textColor
                }
            }}
        />
    </div>
)
