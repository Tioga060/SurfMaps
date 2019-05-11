import React from 'react';
import ReactMarkdown from 'react-markdown';
import { classNames as cn } from '../../styles'

interface IProps {
    description: string;
}

// TODO: fix this from expanding when text is super wide
export class MapDescription extends React.Component<IProps> {
    public render() {
        return (
            <div className={cn.mapCard}>
                <ReactMarkdown
                    skipHtml
                    className={cn.textColor}
                    source={this.props.description}
                    disallowedTypes={['image']}
                />
            </div> 
        );
    }
    
}