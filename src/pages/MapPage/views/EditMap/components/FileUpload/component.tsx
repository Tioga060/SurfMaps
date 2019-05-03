import React from 'react';
import get from 'lodash/get';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { FileDropzone } from 'shared/components/FileDropzone';
import { IState as IRootState, IEditMapFile } from '../EditMapDrawerContent/component';
import { classNames as cn } from '../../styles';
import { IEditMapContext } from '../EditMapDrawerContent/container';

interface IProps {
    updateRootState: (partialState: Partial<IRootState>) => void;
    mapFiles: IEditMapFile[];
    context: IEditMapContext;
}

const updateFiles = (props: IProps, index: number) => (files: File[]) => {
    props.updateRootState({mapFiles: [
        ...props.mapFiles.slice(0, index),
        {
            ...props.mapFiles[index],
            files,
        },
        ...props.mapFiles.slice(index + 1),
    ]});
};

const updateDescription = (props: IProps, index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    props.updateRootState({mapFiles: [
        ...props.mapFiles.slice(0, index),
        {
            ...props.mapFiles[index],
            description: e.target.value,
        },
        ...props.mapFiles.slice(index + 1),
    ]});
};

const updateGame = (props: IProps, index: number) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const game = props.context.allGames.nodes.find((gameName) => (
        gameName.name === e.target.value
    ));
    if (game) {
        props.updateRootState({mapFiles: [
            ...props.mapFiles.slice(0, index),
            {
                ...props.mapFiles[index],
                game,
            },
            ...props.mapFiles.slice(index + 1),
        ]});
    }
}

const createBlankMapFile = (): IEditMapFile => ({
    files: [],
    game: null,
    description: '',
})

const addMapFile = (props: IProps) => () => {
    props.updateRootState({
        mapFiles: [
            ...props.mapFiles,
            createBlankMapFile(),
        ]
    })
}

const deleteFile = (props: IProps, index: number) => () => {
    props.updateRootState({
        mapFiles: [
            ...props.mapFiles.slice(0, index),
            ...props.mapFiles.slice(index + 1),
        ]
    })
}

export const FileUpload: React.StatelessComponent<IProps> = (props) => (
    <div className={cn.drawerCard}>
        <Typography variant="h6" align="center">
            Map Files
        </Typography>
        {props.mapFiles.map((mapFile, index) => (
            <div className="py-3">
                {index !== 0 && <Divider/>}
                <div className="d-flex">
                    <div className="pt-2">
                        <IconButton
                            onClick={deleteFile(props, index)}
                            aria-label="Remove File"
                        >
                            <Delete/>
                        </IconButton>
                    </div>
                    <FormControl fullWidth>
                        <div className="mb-3">
                            <InputLabel htmlFor="game-input">Game</InputLabel>
                            <Select
                                value={get(mapFile, 'game.name', '')}
                                onChange={updateGame(props, index)}
                                inputProps={{
                                    id: 'game-input',
                                    className: 'text-left',
                                }}
                                fullWidth
                            >
                                {props.context.allGames.nodes.map((item) => (
                                    <MenuItem key={item.rowId} value={item.name}>{item.name}</MenuItem>
                                ))}
                            </Select>
                        </div>
                    </FormControl>
                </div>
                <TextField
                    label="File Description"
                    margin="dense"
                    fullWidth
                    value={mapFile.description}
                    onChange={updateDescription(props, index)}
                />
                {!!get(mapFile, 'game.name', null) && 
                    <FileDropzone files={mapFile.files} setFiles={updateFiles(props, index)} singleFile />
                }
            </div>
        ))}
        <div>
            <Button variant="outlined" color="primary" onClick={addMapFile(props)} className="my-2">
                Add File
            </Button>
        </div>
    </div>
);
