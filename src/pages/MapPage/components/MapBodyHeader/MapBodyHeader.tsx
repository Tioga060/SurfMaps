import React from 'react';
import {
    Headline2,
} from '@material/react-typography';

import { UserBadge } from 'shared/components/UserBadge';
import { IMap } from 'shared/types';
import '../../styles.scss';
import './styles.scss';

interface IProps {
    map: IMap;
}

export class MapBodyHeader extends React.Component<IProps> {
    public render() {
        return (
            <div className="map-card">
                <Headline2>
                    {this.props.map.name}
                </Headline2>
                <div className="author-card-container">
                    {this.props.map.mapAuthorsByMapId.nodes.map((author) => (
                        <UserBadge
                            key={author.userByAuthorId.rowId}
                            onPressed={() => {}}
                            steamUser={author.userByAuthorId.userSteamInfosByUserId.nodes[0]}
                            showName
                        />
                    ))}
                </div>
            </div> 
        )
    }
    
}
