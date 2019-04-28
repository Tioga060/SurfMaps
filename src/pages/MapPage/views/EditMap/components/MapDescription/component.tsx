import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { IState as IRootState } from '../EditMapDrawerContent/component';
import { classNames as cn } from '../../styles';

interface IProps {
    value: string;
    updateRootState: (partialState: Partial<IRootState>) => void;
}

const editDescription = (props: IProps) => (e: React.ChangeEvent<HTMLInputElement>) => {
    props.updateRootState({
        description: e.target.value,
    });
};

export const MapDescription: React.StatelessComponent<IProps> = (props) => (
    <div>
        <Typography variant="h6" align="center">
            Map Description
        </Typography>
        <TextField
            label="Map Description (Markdown)"
            margin="dense"
            multiline
            fullWidth
            rows={2}
            rowsMax={10}
            value={props.value}
            onChange={editDescription(props)}
            InputProps={{
                classes: {
                    input: cn.textFieldSmall
                }
            }}
        />
    </div>
);
