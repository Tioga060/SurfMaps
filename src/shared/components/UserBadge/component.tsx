import React from 'react';
import Button from '@material-ui/core/Button';
import classnames from 'classnames';
import { IUserSteamInfo } from 'shared/types';
import { IBadgeContainerProps } from './UserBadgeContainer';
import { classNames as cn } from './styles';

type IProps = IBadgeContainerProps & {
    steamUser: IUserSteamInfo;
}

export const UserBadge: React.StatelessComponent<IProps> = (props) => {
    const steamUser = props.steamUser;
    return steamUser ? (
        <Button
            variant="contained"
            color="primary"
            onClick={props.onPressed}
            classes={{
                root: classnames({'pr-2 pl-2': !props.showName, [cn.noNameWidth]: !props.showName}),
            }}
        >
            <img className={cn.iconImage} src={steamUser.avatar}/>
            {props.showName && (
                <div className="pl-2">
                    {steamUser.name}
                </div>
            )}
            
        </Button>
    ) : null;
}
