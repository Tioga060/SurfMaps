import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { useDropzone } from 'react-dropzone';
import {
    classNames as cn,
} from './styles';

type IImageFile = File & {
    preview: string;
}

interface IProps {
    //uploadFiles: (files: File[]) => void;
    singleImage?: boolean;
}


export const Dropzone: React.StatelessComponent<IProps> = (props) => {
    const [files, setFiles] = useState([] as IImageFile[]);
    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        accept: 'image/jpeg, image/png',
        onDrop: acceptedFiles => {
            setFiles(props.singleImage
                ? [{
                    ...acceptedFiles[0],
                    preview: URL.createObjectURL(acceptedFiles[0]),
                }]
                : [
                    ...files,
                    ...acceptedFiles.map((file) => ({
                        ...file,
                        preview: URL.createObjectURL(file)
                    }))
                ]
            );
        }
    });

    const removeImage = (index: number) => () => {
        setFiles([
            ...files.slice(0, index),
            ...files.slice(index + 1)
        ])
    };

    const thumbs = files.map((file, index) => (
        <div className={cn.thumbnail} key={file.preview} onClick={removeImage(index)}>
            <div className={cn.thumbInner}>
                <img
                    src={file.preview}
                    className={cn.img}
                />
            </div>
        </div>
    ));

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <div className={classnames({
            [cn.componentContainer]: true,
            'd-flex': props.singleImage,
            })}
        >
            <div className={cn.dropZoneContainer}>
                <div {...getRootProps({
                        className: classnames({
                            [cn.dropZone]: true,
                            [cn.idleStyle]: !isDragAccept && !isDragAccept && !isDragReject,
                            [cn.activeStyle]: isDragActive,
                            [cn.acceptStyle]: isDragAccept,
                            [cn.rejectStyle]: isDragReject,
                        })
                    })}>
                    <input {...getInputProps()} />
                    <p>Upload Image</p>
                </div>
            </div>
            <div className={classnames({
                "d-flex flex-wrap justify-content-center": true,
                [`flex-row ${cn.imageContainer}`]: !props.singleImage,
                "flex-column": props.singleImage})}
            >
                {thumbs}
            </div>
        </div>

    );
}