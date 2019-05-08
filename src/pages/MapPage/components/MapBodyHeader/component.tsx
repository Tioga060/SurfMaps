import React from 'react';
import Typography from '@material-ui/core/Typography';
import { UserBadge } from 'shared/components/UserBadge';
import { IMap } from 'shared/types';
import { classNames as cn } from '../../styles';

interface IProps {
    map: IMap;
}

export class MapBodyHeader extends React.Component<IProps> {
    public render() {
        return (
            <div className={cn.mapCard}>
                <Typography variant="h2">
                    {this.props.map.name}
                </Typography>
                <div className="mt-2">
                    {this.props.map.mapAuthorsByMapId.nodes.map((author) => (
                        <UserBadge
                            key={author.userByAuthorId.rowId}
                            steamUser={author.userByAuthorId.userSteamInfoByUserId}
                            showName
                        />
                    ))}
                </div>
            </div> 
        )
    }
    
}
