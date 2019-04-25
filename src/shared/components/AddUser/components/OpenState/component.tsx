import React from 'react';
import { Body1 } from '@material/react-typography';
import IconButton from '@material/react-icon-button';
import MaterialIcon from '@material/react-material-icon';
import { IUserSteamInfo } from 'shared/types';

import { UserListDrawer } from '../UserListDrawer';
import { UserSearch } from '../UserSearch';

import './styles.scss';
import '../../styles.scss';

type IProps = {
    open: () => void;
    descriptor: string;
    steamUserList: IUserSteamInfo[];
    updateSteamUserList: (userList: IUserSteamInfo[]) => void;
}

export const OpenState: React.StatelessComponent<IProps> = props => (
    <>
        <UserListDrawer
            descriptor={props.descriptor}
            steamUserList={props.steamUserList}
            updateSteamUserList={props.updateSteamUserList}
        />
        <div className='open-state-container open-height'>
            <div className='align-center'>
                <Body1 className="title-text">
                    {`Adding ${props.descriptor}`}
                </Body1>
                <IconButton className="pull-right" onClick={props.open}>
                    <MaterialIcon icon='save' className="icon-color"/>
                </IconButton>
            </div>

            <UserSearch updateSteamUserList={props.updateSteamUserList} steamUserList={props.steamUserList}/>
        </div>
    </>
);
