import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { IDisplayMap, IDisplayDescription } from '../../../../types';
import { MAX_DESCRIPTION_LENGTH } from '../../../../helpers';
import { classNames as cn } from '../../styles';

interface IProps {
    description: IDisplayDescription;
    updateMap: (partialState: Partial<IDisplayMap>) => void;
}

const editDescription = (props: IProps) => (e: React.ChangeEvent<HTMLInputElement>) => {
    props.updateMap({
        description: {
            ...props.description,
            text: e.target.value,
        }
    });
};

export const MapDescription: React.StatelessComponent<IProps> = (props) => (
    <div>
        <div className={cn.drawerCardHeader}>
            <Typography variant="h6" align="center">
                Map Description
            </Typography>
        </div>
        <div className={cn.drawerCardContent}>
            <TextField
                label="Map Description (Markdown)"
                margin="dense"
                multiline
                fullWidth
                rowsMax={10}
                value={props.description.text}
                onChange={editDescription(props)}
                InputProps={{
                    classes: {
                        input: cn.textFieldSmall
                    }
                }}
                inputProps={{
                    maxLength: MAX_DESCRIPTION_LENGTH,
                }}
            />
        </div>
    </div>
);
