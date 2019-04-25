import React from 'react';
import { Body1 } from '@material/react-typography';
import { IUserSteamInfo } from 'shared/types';
import { UserBadge } from 'shared/components/UserBadge';
import MaterialIcon from '@material/react-material-icon';
import './styles.scss';
import '../../styles.scss';

interface IProps {
    steamUserList: IUserSteamInfo[];
    updateSteamUserList: (userList: IUserSteamInfo[]) => void;
    descriptor: string;
}

const removeUser = (index: number, props: IProps) => () => {
    props.updateSteamUserList([
        ...props.steamUserList.slice(0,index),
        ...props.steamUserList.slice(index+1),
    ])
}

export const UserListDrawer: React.StatelessComponent<IProps> = props => (
    <div className='user-list-drawer'>
        <div className="userlist-drawer-header">
            <Body1 className="text-center">{`${props.descriptor} List`}</Body1>
            <hr className="small-hr"/>
        </div>
        <div className="userlist-drawer-content">
            {props.steamUserList.map((steamUser, index) => (
                <div className='badge-container' key={index}>
                    <MaterialIcon
                        className="icon-color icon-margin"
                        icon='close'
                        onClick={removeUser(index, props)}
                    />
                    <UserBadge showName steamUser={steamUser}/>
                </div>
            ))}
        </div>
    </div>
);
