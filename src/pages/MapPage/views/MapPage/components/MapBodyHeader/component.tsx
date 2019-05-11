import React from 'react';
import Typography from '@material-ui/core/Typography';
import { UserBadge } from 'shared/components/UserBadge';
import { IDisplayMap } from '../../../../types';
import { classNames as cn } from '../../styles';

interface IProps {
    map: IDisplayMap;
}

export class MapBodyHeader extends React.Component<IProps> {
    public render() {
        return (
            <div className={cn.mapCard}>
                <Typography variant="h2">
                    {this.props.map.mapName}
                </Typography>
                <div className={`mt-2 ${cn.badgeContainer}`}>
                    {this.props.map.authors.map((author) => (
                        <UserBadge
                            key={author.userId}
                            steamUser={author}
                            showName
                        />
                    ))}
                </div>
            </div> 
        )
    }
    
}
