import React, { useEffect } from 'react';
import classnames from 'classnames';
import { useDropzone } from 'react-dropzone';
import { classNames as cn } from './styles';

export interface IEditImage {
    storeLocation?: string;
    file?: File;
    rowId?: string;
}

interface IProps {
    files: IEditImage[];
    setFiles: (files: IEditImage[]) => void;
    singleImage?: boolean;
}

export const ImageDropzone: React.StatelessComponent<IProps> = ({singleImage, files, setFiles}) => {
    const previews = files.map((file) => (
        file.file
            ? { url: URL.createObjectURL(file.file), isFile: true }
            : { url: file.storeLocation || '', isFile: false }
    ));
    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        accept: 'image/jpeg, image/png',
        onDrop: acceptedFiles => {
            setFiles(singleImage
                ? [{file: acceptedFiles[0]}]
                : [
                    ...files,
                    ...acceptedFiles.map((file) => ({
                        file,
                    }))
                ]);
        }
    });
    const removeImage = (index: number) => () => {
        setFiles([
            ...files.slice(0, index),
            ...files.slice(index + 1)
        ])
    };
    const thumbs = previews.map((file, index) => (
        <div className={cn.thumbnail} key={index} onClick={removeImage(index)}>
            <div className={cn.thumbInner}>
                <img
                    src={file.url}
                    className={cn.img}
                />
            </div>
        </div>
    ));

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        previews.forEach(file => {
            if (file.isFile) {
                URL.revokeObjectURL(file.url);
            }
        });
    }, [files]);

    return (
        <div className={classnames({
            [cn.componentContainer]: true,
            'd-flex': singleImage,
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
                    <p>{`Upload Image${singleImage ? '' : 's'}`}</p>
                </div>
            </div>
            <div className={classnames({
                "d-flex flex-wrap justify-content-center": true,
                [`flex-row ${cn.imageContainer}`]: !singleImage,
                "flex-column": singleImage})}
            >
                {thumbs}
            </div>
        </div>

    );
}