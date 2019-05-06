import React from 'react';
import ReactMarkdown from 'react-markdown';
import { IMapDescription } from 'shared/types';
import { classNames as cn } from '../../styles'

interface IProps {
    description: IMapDescription;
}

// TODO: fix this from expanding when text is super wide
export class MapDescription extends React.Component<IProps> {
    public render() {
        return (
            <div className={cn.mapCard}>
                <ReactMarkdown
                    skipHtml
                    className={cn.textColor}
                    source={this.props.description.textMarkdownByTextMarkdownId.text}
                    disallowedTypes={['image']}
                />
            </div> 
        );
    }
    
}