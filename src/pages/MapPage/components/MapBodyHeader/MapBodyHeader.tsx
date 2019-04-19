import React from 'react';
import { IMap } from '../../../../shared/types';
import '../../styles.scss';

interface IProps {
    map: IMap;
}

export class MapBodyHeader extends React.Component<IProps> {
    public render() {
        return (
            <div className="map-card">
                TEST
            </div> 
        )
    }
    
}
