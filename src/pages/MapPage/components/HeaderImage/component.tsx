import React from 'react';

import { IImage } from 'shared/types';
import '../../styles.scss';
import './styles.scss';

interface IProps {
    image: IImage | null;
}

export class HeaderImage extends React.Component<IProps> {
    public render() {
        return this.props.image ? (
            <div className="map-card">
                <img className= "header-image" src={this.props.image.storeLocation} />
            </div> 
        ) : null;
    }
    
}
