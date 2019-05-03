import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import { useDropzone } from 'react-dropzone';
import { classNames as cn } from './styles';

interface IProps {
    files: File[];
    setFiles: (files: File[]) => void;
    singleFile?: boolean;
}


export const FileDropzone: React.StatelessComponent<IProps> = ({singleFile, files, setFiles}) => {
    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        accept: 'image/jpeg, image/png',
        onDrop: acceptedFiles => {
            setFiles(singleFile
                ? [acceptedFiles[0]]
                : [
                    ...files,
                    ...acceptedFiles
                ]);
        }
    });
    const removeFile = (index: number) => () => {
        setFiles([
            ...files.slice(0, index),
            ...files.slice(index + 1)
        ])
    };
    const thumbs = files.map((file, index) => (
        <div className={cn.thumbnail} key={index} onClick={removeFile(index)}>
            <Typography variant="body1">
                {file.name}
            </Typography>
        </div>
    ));

    return (
        <div>
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
                    <p>{`Upload File${singleFile ? '' : 's'}`}</p>
                </div>
            </div>
            <div className={`d-flex flex-wrap justify-content-center flex-row ${cn.fileContainer}`}>
                {thumbs}
            </div>
        </div>

    );
}