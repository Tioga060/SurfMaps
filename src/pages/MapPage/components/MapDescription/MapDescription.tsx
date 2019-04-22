import React from 'react';
import ReactMarkdown from 'react-markdown';
import { IMapDescription } from 'shared/types';
import '../../styles.scss';
import './styles.scss';

interface IProps {
    description: IMapDescription;
}

export class MapDescription extends React.Component<IProps> {
    public render() {
        console.log(this.props.description.textMarkdownByTextMarkdownId.text)
        return (
            <div className="map-card">
                <ReactMarkdown
                    skipHtml
                    className="white-text"
                    source={this.props.description.textMarkdownByTextMarkdownId.text}
                />
            </div> 
        );
    }
    
}