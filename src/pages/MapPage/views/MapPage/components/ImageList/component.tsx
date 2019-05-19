import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import { classNames as cn } from '../../styles';
import { IEditImage } from 'shared/components/ImageDropzone';

interface IProps {
    setHeaderImage: (image: IEditImage) => void;
    images: IEditImage[];
}

interface IState {
    isScrolling: boolean;
    scrollLeft: number;
    clientX: number;
}

export class ImageList extends React.Component<IProps, IState> {
    private _scroller: any;
    private _pushedUrls: string[];

    public constructor(props: IProps) {
        super(props);
        this.state = {
            isScrolling: false,
            scrollLeft: 0,
            clientX: 0,
        }
        this._pushedUrls = [];
    }

    public setHeaderImage = (image: IEditImage) => () => {
        this.props.setHeaderImage(image);
    }

    public componentWillUnmount() {
        this._pushedUrls.forEach(url => URL.revokeObjectURL(url));
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
        // check for zero to prevent dragging from resetting it
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
            <div className={cn.mapCard}>
                <div
                    className={classnames({
                        [cn.scrollImageContainer]: true,
                        [cn.scrollImageContainerBig]: this.props.images.length > 7,
                        [cn.scrollImageContainerSmall]: this.props.images.length <= 7,
                    })}
                    ref={this.attachScroller}
                    onMouseDown={this.onMouseDown}
                    onMouseUp={this.onMouseUp}
                    onMouseMove={this.onMouseMove}
                    onDragStart={this.onMouseDown}
                    onDrag={this.onMouseMove}
                    onDragEnd={this.onMouseUp}
                    draggable={true}
                >
                    {this.props.images.map((image, index) => {
                        if (!image.storeLocation) {
                            return null;
                        } // TODO - make sure image destruction works as expected
                        const url = !!image.storeLocation
                            ? image.storeLocation
                            : URL.createObjectURL(image.file);
                        const cardMedia = <CardMedia className={cn.scrollImage} image={url} />

                        if (!!image.file) {
                            this._pushedUrls.push(url);
                        }

                        return (
                        <div
                            key={`${url}${index}`}
                            className={`m-1 ${cn.scrollImage}`}
                            onClick={this.setHeaderImage(image)}
                        >
                            <Card>
                                <CardActionArea>
                                    {cardMedia}
                                </CardActionArea>
                            </Card>
                        </div>
                    )})}
                </div>
            </div> 
        ) : null;
    }
}
