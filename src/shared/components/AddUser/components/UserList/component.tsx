import React from 'react';
import AddToPhotos from '@material-ui/icons/AddToPhotos';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import { IUserSteamInfo } from 'shared/types';
import { UserBadge } from 'shared/components/UserBadge';
import { classNames as cn } from '../../styles';

export interface IProps {
    steamUserList: IUserSteamInfo[];
    updateSteamUserList: (userList: IUserSteamInfo[]) => void;
    add?: boolean;
    listToModify?: IUserSteamInfo[];
}

const updateList = (index: number, props: IProps) => () => {
    if (props.add) {
        const steamIds = props.listToModify!.map(user => (user.numericSteamId));
        if (!steamIds.includes(props.steamUserList[index].numericSteamId)) {
            props.updateSteamUserList([
                ...props.listToModify!,
                props.steamUserList[index],
            ]);
        }
    } else {
        props.updateSteamUserList([
            ...props.steamUserList.slice(0,index),
            ...props.steamUserList.slice(index+1),
        ])
    }

}

export const UserList: React.StatelessComponent<IProps> = (props) => (
    <>
        <Divider/>
        <div className={cn.userListContainer}>
            {props.steamUserList.map((steamUser, index) => (
                <div className="d-flex mb-1" key={index}>
                    <IconButton
                        onClick={updateList(index, props)}
                        aria-label="Remove User"
                        classes={{
                            root: cn.buttonSize,
                        }}
                    >
                        {props.add ? <AddToPhotos/> : <Delete/>}
                    </IconButton>
                    <UserBadge showName steamUser={steamUser}/>
                </div>
            ))}
        </div>
    </>
);
