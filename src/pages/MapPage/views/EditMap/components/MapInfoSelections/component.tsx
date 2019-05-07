import React from 'react';
import get from 'lodash/get';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { IState as IRootState, IEditStage } from '../EditMapDrawerContent/component';
import { IEditMapContext } from '../EditMapDrawerContent/container';
import { removeAllStages, MAP_TYPES, STAGE_TYPES, alreadyHasLinearSection } from '../../helpers';
import * as T from 'shared/types/descriptors';
import { IUserSteamInfo } from 'shared/types';

type IUnion = T.IMapTypeAsNodes | T.IGameAsNodes | T.IGameModeAsNodes;

interface IProps {
    state: Partial<IRootState>;
    updateRootState: (partialState: Partial<IRootState>) => void;
    context: IEditMapContext;
    stages: IEditStage[];
    primaryAuthor: IUserSteamInfo;
}

enum FIELDS {
    MAP_TYPE = 'mapType',
    GAME = 'game',
    GAME_MODE = 'gameMode',
}

const updateState = (
    field: string,
    updateRootState: (partialState: Partial<IRootState>) => void,
    list: IUnion,
    props: IProps,
) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedItem = list.nodes.find((item) => item.name === e.target.value);
    if (selectedItem) {
        let stages = props.stages;
        if (field === FIELDS.MAP_TYPE) {
            if (selectedItem.name === MAP_TYPES.LINEAR) {
                stages = removeAllStages(props.stages, STAGE_TYPES.STAGE);
                if (!alreadyHasLinearSection(stages)) {
                    stages.push({
                        name: '',
                        number: -1,
                        authors: [props.primaryAuthor],
                        stageType: props.context.allStageTypes.nodes.find((stageType) => stageType.name === STAGE_TYPES.LINEAR) || {name: STAGE_TYPES.LINEAR},
                        images: [],
                    })
                }
            } else if (selectedItem.name === MAP_TYPES.STAGED) {
                stages = removeAllStages(props.stages, STAGE_TYPES.LINEAR);
            }
        }
        updateRootState({[field]: selectedItem, stages});
    }
}

export const MapInfoSelections: React.StatelessComponent<IProps> = (props) => (
    <div>
        <FormControl fullWidth>
            <div className="mb-3">
                <InputLabel htmlFor="game-input">Primary Game</InputLabel>
                <Select
                    value={get(props, 'state.game.name', '')}
                    onChange={updateState(FIELDS.GAME, props.updateRootState, props.context.allGames, props)}
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
        <FormControl fullWidth>
            <div className="mb-3">
                <InputLabel htmlFor="gameMode-input">Game Mode</InputLabel>
                <Select
                    value={get(props, 'state.gameMode.name', '')}
                    onChange={updateState(FIELDS.GAME_MODE, props.updateRootState, props.context.allGameModes, props)}
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
        </FormControl>
        <FormControl fullWidth>
            <div className="mb-3">
                <InputLabel htmlFor="mapType-input">Map Type</InputLabel>
                <Select
                    value={get(props, 'state.mapType.name', '')}
                    onChange={updateState(FIELDS.MAP_TYPE, props.updateRootState, props.context.allMapTypes, props)}
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
        </FormControl>
    </div>
);
