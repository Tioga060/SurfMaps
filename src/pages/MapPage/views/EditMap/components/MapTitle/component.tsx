import React from 'react';
import TextField, {Input} from '@material/react-text-field';
import './styles.scss';

interface IProps {
    value: string;
    updateMapName: (e: React.FormEvent<HTMLInputElement>) => void;
}

export const MapTitle: React.StatelessComponent<IProps> = (props) => (
    <TextField
        label='Map Name'
        dense
    >
        <Input
            value={props.value}
            onChange={props.updateMapName}
        />
    </TextField>
)
