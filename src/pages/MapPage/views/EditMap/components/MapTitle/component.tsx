import React from 'react';
import TextField from '@material-ui/core/TextField';
import { IState as IRootState } from '../EditMapDrawerContent/component';

interface IProps {
    value: string;
    updateRootState: (partialState: Partial<IRootState>) => void;
}

const editMapName = (props: IProps) => (e: React.ChangeEvent<HTMLInputElement>) => {
    props.updateRootState({
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
            onChange={editMapName(props)}
        />
    </div>
);
