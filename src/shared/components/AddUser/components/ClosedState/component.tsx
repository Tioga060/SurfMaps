import React from 'react';
import { Body1 } from '@material/react-typography';
import IconButton from '@material/react-icon-button';
import MaterialIcon from '@material/react-material-icon';

import './styles.scss';
import '../../styles.scss';

type IProps = {
    open: () => void;
    descriptor: string;
}

export const ClosedState: React.StatelessComponent<IProps> = props => (
    <div className="closed-state-container">
        <div className='align-center'>
            <Body1 className="title-text">
                {`Add ${props.descriptor}`}
            </Body1>
            <IconButton className="pull-right" onClick={props.open}>
                <MaterialIcon icon='person_add' className="icon-color"/>
            </IconButton>
        </div>
    </div>
);
