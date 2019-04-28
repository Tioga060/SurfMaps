import React from 'react';
import Typography from '@material-ui/core/Typography';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Done from '@material-ui/icons/Done';
import IconButton from '@material-ui/core/IconButton';
import { classNames as cn } from '../../styles';

type IProps = {
    open: () => void;
    isOpen: boolean;
    descriptor: string;
}

export const AddUserHeader: React.StatelessComponent<IProps> = (props) => (
    <div>
        <div className="d-flex align-items-start">
            <Typography variant="h6" align="center" className={`pl-3 pt-2 ${cn.headerOverflow}`}>
                {props.descriptor}
            </Typography>
            <IconButton className="ml-auto" onClick={props.open} aria-label="Add User">
                {props.isOpen ? <Done/> : <PersonAdd/>}
            </IconButton>
        </div>
    </div>
);
