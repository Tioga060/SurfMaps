import React from 'react';
import ReactDOM from 'react-dom';
import Card, {
    CardPrimaryContent,
    CardMedia,
  } from "@material/react-card";

import { IImage } from 'shared/types';
import '../../styles.scss';
import './styles.scss';

interface IProps {
    setHeaderImage: (image: IImage) => void;
    images: IImage[] | undefined;
}

interface IState {
    isScrolling: boolean;
    scrollLeft: number;
    clientX: number;
}

export class ImageList extends React.Component<IProps, IState> {
    private _scroller: any;

    public constructor(props: IProps) {
        super(props);
        this.state = {
            isScrolling: false,
            scrollLeft: 0,
            clientX: 0,
        }
    }

    public setHeaderImage = (image: IImage) => () => {
        this.props.setHeaderImage(image);
    }

    public componentWillUpdate = (nextProps: IProps, nextState: IState) => {
        if (this.state.isScrolling !== nextState.isScrolling) {
            this.toggleScrolling(nextState.isScrolling);
        }
    }

    public toggleScrolling = (isScrolling: boolean) => {
        if (isScrolling) {
            window.addEventListener('mousemove', this.onMouseMove);
            window.addEventListener('mouseup', this.onMouseUp);
        } else {
            window.removeEventListener('mousemove', this.onMouseMove);
        }
    }

    public onMouseMove = (event: any) => {
        // check for zero to prevent dragging fro resetting it
        if (this.state.isScrolling && event.clientX !== 0) {
            const {clientX, scrollLeft} = this.state;
            this._scroller.scrollLeft = (scrollLeft + clientX - event.clientX);
        }
    }

    public onMouseUp = () => {
        this.setState({
            isScrolling: false,
        })
    }

    public onMouseDown = (event: any) => {
        if (!this.state.isScrolling) {
            const {scrollLeft} = this._scroller;
            this.setState({
                isScrolling: true,
                scrollLeft,
                clientX: event.clientX
            })
        }
    }

    public attachScroller = (scroller: any) => {
        this._scroller = ReactDOM.findDOMNode(scroller);
    }

    public render() {
        return this.props.images ? (
            <div className="map-card">
                <div
                    className="scroll-image-container"
                    ref={this.attachScroller}
                    onMouseDown={this.onMouseDown}
                    onMouseUp={this.onMouseUp}
                    onMouseMove={this.onMouseMove}
                    onDragStart={this.onMouseDown}
                    onDrag={this.onMouseMove}
                    onDragEnd={this.onMouseUp}
                    draggable={true}
                >
                    {this.props.images!.map((image, index) => (
                        <div
                            key={`${image.storeLocation}${index}`}
                            className="scroll-image"
                            onClick={this.setHeaderImage(image)}
                        >
                            <Card>
                                <CardPrimaryContent>
                                    <CardMedia square imageUrl={image.storeLocation} />
                                </CardPrimaryContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div> 
        ) : null;
    }
    
}
