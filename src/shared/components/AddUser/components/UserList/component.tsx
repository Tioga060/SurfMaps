import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import { IUserSteamInfo } from 'shared/types';
import { UserBadge } from 'shared/components/UserBadge';
import { classNames as cn } from '../../styles';

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
    <>
        <Divider/>
        <div className={cn.userListContainer}>
            {props.steamUserList.map((steamUser, index) => (
                <div className="d-flex mb-1" key={index}>
                    <IconButton
                        onClick={removeUser(index, props)}
                        aria-label="Remove User"
                        classes={{
                            root: cn.buttonSize,
                        }}
                    >
                        <Delete/>
                    </IconButton>
                    <UserBadge showName steamUser={steamUser}/>
                </div>
            ))}
        </div>
    </>
);
