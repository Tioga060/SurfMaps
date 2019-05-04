import * as T from 'shared/types';
import get from 'lodash/get';
import { IState as IEditMapState, IEditStage, IEditMapFile, IContributor } from './components/EditMapDrawerContent/component';
import { STAGE_TYPES, MAP_TYPES } from './helpers';

interface GenericContext {
    rowId?: string;
    name: string | undefined;
}

export enum FORM_ERRORS {
    MAP_NAME = 'mapName',
    AUTHORS = 'authors',
    TIER = 'tier',
    GAME_MODE = 'gameMode',
    GAME = 'game',
    MAP_TYPE = 'mapType',
    STAGES = 'stages',
};

const validateMapName = (name: string) => !!name && name.length > 3;
const validateAuthors = (authors: T.IUserSteamInfo[]) => !!authors && authors.length > 0;
const validateTier = (tier: number) => !!tier && 1 <= tier && tier <= 6;
const validateSelection = (selection: GenericContext) => !!selection && get(selection, 'rowId.length', 0) === 36;
const validateStages = (stages: IEditStage[], mapType: T.IMapType) => {
    let isValid = true;

    // check each stage
    isValid = isValid && !stages.some((stage) => (!stage.authors.length || !(get(stage, 'stageType.rowId.lengt', 0) === 36)));

    // verify there is more than 1 stage on a staged map
    if (mapType.name === MAP_TYPES.STAGED) {
        isValid === isValid && stages.reduce((count, stage) => {
            if (stage.stageType.name === STAGE_TYPES.STAGE) {
                count += 1;
            }
            return count;
        }, 0) > 1;
    }

    // verify that there is exactly one linear section
    else if (mapType.name === MAP_TYPES.LINEAR) {
        isValid === isValid && stages.reduce((count, stage) => {
            if (stage.stageType.name === STAGE_TYPES.LINEAR) {
                count += 1;
            }
            return count;
        }, 0) === 1;
    }
    return isValid;
};

export const validateMapInfo = (editMapState: IEditMapState): string[] => {
    const errors: string[] = [];
    if (!validateMapName(editMapState.mapName)) { 
        errors.push(FORM_ERRORS.MAP_NAME);
    }
    if (!validateAuthors(editMapState.authors)) { 
        errors.push(FORM_ERRORS.AUTHORS);
    }
    if (!validateTier(editMapState.tier)) { 
        errors.push(FORM_ERRORS.TIER);
    }
    if (!validateSelection(editMapState.game)) { 
        errors.push(FORM_ERRORS.GAME);
    }
    if (!validateSelection(editMapState.gameMode)) { 
        errors.push(FORM_ERRORS.GAME_MODE);
    }
    if (!validateSelection(editMapState.mapType)) { 
        errors.push(FORM_ERRORS.MAP_TYPE);
    }
    if (!validateStages(editMapState.stages, editMapState.mapType)) {
        errors.push(FORM_ERRORS.STAGES)
    }
    return errors;
}