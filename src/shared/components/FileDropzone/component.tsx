import React, { useEffect } from 'react';
import get from 'lodash/get';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import { useDropzone } from 'react-dropzone';
import { classNames as cn } from './styles';

export interface IEditFile {
    storeLocation?: string;
    file?: File;
    rowId?: string;
}

interface IProps {
    files: IEditFile[];
    setFiles: (files: IEditFile[]) => void;
    singleFile?: boolean;
}

export const FileDropzone: React.StatelessComponent<IProps> = ({singleFile, files, setFiles}) => {
    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        accept: '.bsp, application/octet-stream', // TODO
        onDrop: acceptedFiles => {
            if (!acceptedFiles.length) {
                return;
            }
            setFiles(singleFile
                ? [{file: acceptedFiles[0]}]
                : [
                    ...files,
                    {file: acceptedFiles[0]}
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
                {file.storeLocation ? file.storeLocation.split('-').slice(-1)[0] : get(file, 'file.name', '<ERROR>')}
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