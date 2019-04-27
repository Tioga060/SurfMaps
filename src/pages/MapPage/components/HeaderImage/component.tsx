import React from 'react';
import { IImage } from 'shared/types';
import { classNames as cn } from '../../styles';

interface IProps {
    image: IImage | null;
}

export class HeaderImage extends React.Component<IProps> {
    public render() {
        return this.props.image ? (
            <div className={cn.mapCard}>
                <img className= "mw-100 mh-100" src={this.props.image.storeLocation} />
            </div> 
        ) : null;
    }
    
}
