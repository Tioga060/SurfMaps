import React from 'react';
import get from 'lodash/get';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { IState as IRootState } from '../EditMapDrawerContent/component';
import { IEditMapContext } from '../EditMapDrawerContent/container';
import * as T from 'shared/types/descriptors';

type IUnion = T.IMapTypeAsNodes | T.IGameAsNodes | T.IGameModeAsNodes

interface IProps {
    state: Partial<IRootState>;
    updateRootState: (partialState: Partial<IRootState>) => void;
    context: IEditMapContext;
}

const updateState = (
    field: string,
    updateRootState: (partialState: Partial<IRootState>) => void,
    list: IUnion
) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedItem = list.nodes.find((item) => item.name === e.target.value);
    if (selectedItem) {
        updateRootState({[field]: selectedItem});
    }
}

export const MapInfoSelections: React.StatelessComponent<IProps> = (props) => (
    <>
        <div className="mb-3">
            <InputLabel htmlFor="game-input">Primary Game</InputLabel>
            <Select
                value={get(props, 'state.game.name', '')}
                onChange={updateState('game', props.updateRootState, props.context.allGames)}
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

        <div className="mb-3">
            <InputLabel htmlFor="gameMode-input">Game Mode</InputLabel>
            <Select
                value={get(props, 'state.gameMode.name', '')}
                onChange={updateState('gameMode', props.updateRootState, props.context.allGameModes)}
                inputProps={{
                    id: 'gameMode-input',
                    className: 'text-left',
                }}
                fullWidth
            >
                {props.context.allGameModes.nodes.map((item) => (
                    <MenuItem key={item.rowId} value={item.name}>{item.name}</MenuItem>
                ))}
            </Select>
        </div>

        <div className="mb-3">
            <InputLabel htmlFor="mapType-input">Map Type</InputLabel>
            <Select
                value={get(props, 'state.mapType.name', '')}
                onChange={updateState('mapType', props.updateRootState, props.context.allMapTypes)}
                inputProps={{
                    id: 'mapType-input',
                    className: 'text-left',
                }}
                fullWidth
            >
                {props.context.allMapTypes.nodes.map((item) => (
                    <MenuItem key={item.rowId} value={item.name}>{item.name}</MenuItem>
                ))}
            </Select>
        </div>
    </>
);
