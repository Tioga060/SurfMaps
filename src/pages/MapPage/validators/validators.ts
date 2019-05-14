import * as T from 'shared/types';
import get from 'lodash/get';
import * as MapTypes from '../types';
import { fetchQuery } from 'react-relay';
import {environment} from 'shared/resources/graphql';
import { validMapNameQuery } from './ValidatorGQL';
import { STAGE_TYPES, MAP_TYPES, MAX_DESCRIPTION_LENGTH, MODES } from '../helpers';
import { getNextStageNumber } from '../helpers';

interface GenericContext {
    rowId?: string;
    name: string | undefined;
}

export enum FORM_ERRORS {
    MAP_NAME = 'mapName',
    MAP_NAME_EXISTS = 'mapNameExists',
    AUTHORS = 'authors',
    TIER = 'tier',
    GAME_MODE = 'gameMode',
    GAME = 'game',
    MAP_TYPE = 'mapType',
    STAGE_AUTHORS = 'stageAuthors',
    STAGE_CONTINUITY = 'stageContinuity',
    STAGE_COUNT = 'stageCount',
    STAGE_LINEAR_COUNT = 'stageLinearCount',
    DESCRIPTION = 'description',
    CONTRIBUTORS = 'contributors',
    MAP_FILES = 'mapFiles',
};

interface IMapNameResponse {
    allMaps: {
        nodes: {name: string}[];
    }
}

const validateMapName = async (name: string, mode: MODES) => {
    const errors: string[] = [];
    const regexp = /^[a-zA-Z0-9-_]+$/;
    if (!name || name.length < 6 || name.search(regexp) === -1) {
        errors.push(FORM_ERRORS.MAP_NAME);
    }
    if (mode === MODES.ADD) {
        if ((await fetchQuery(environment, validMapNameQuery, {condition: {name}}).then((data: IMapNameResponse) => (data))).allMaps.nodes.length > 0) {
            errors.push(FORM_ERRORS.MAP_NAME_EXISTS);
        }
    }
    return errors;
};
const validateAuthors = (authors: T.IUserSteamInfo[]) => !!authors && authors.length > 0;
const validateTier = (tier: number) => !!tier && 1 <= tier && tier <= 6;
const validateSelection = (selection: GenericContext) => !!selection && get(selection, 'rowId.length', 0) === 36;
const validateStages = (stages: MapTypes.IDisplayStage[], mapType: T.IMapType): string[] => {
    const errors: string[] = [];

    // check each stage
    if (stages.some((stage) => (get(stages, '[0].authors[0].userId.length', 0) !== 36 || get(stage, 'stageType.rowId.length', 0) !== 36))) {
        errors.push(FORM_ERRORS.STAGE_AUTHORS);
    }

    // verify there is more than 1 stage on a staged map
    if (mapType.name === MAP_TYPES.STAGED) {
        if (stages.reduce((count, stage) => {
            if (stage.stageType.name === STAGE_TYPES.STAGE) {
                count += 1;
            }
            return count;
        }, 0) <= 1) {
            errors.push(FORM_ERRORS.STAGE_COUNT);
        }
    }

    // verify that there is exactly one linear section
    else if (mapType.name === MAP_TYPES.LINEAR) {
        if(stages.reduce((count, stage) => {
            if (stage.stageType.name === STAGE_TYPES.LINEAR) {
                count += 1;
            }
            return count;
        }, 0) !== 1) {
            errors.push(FORM_ERRORS.STAGE_LINEAR_COUNT)
        }
    }

    // Stage Continuity
    const numberOfBonuses = stages.reduce((number, stage) => {
        return number + (stage.stageType.name === STAGE_TYPES.BONUS ? 1 : 0);
    }, 0);
    if (numberOfBonuses > 0 && getNextStageNumber(stages, STAGE_TYPES.BONUS) !== numberOfBonuses + 1) {
        errors.push(FORM_ERRORS.STAGE_CONTINUITY);
    } else {
        const numberOfStages = stages.reduce((number, stage) => {
            return number + (stage.stageType.name === STAGE_TYPES.STAGE ? 1 : 0);
        }, 0);
        if ( numberOfStages > 0 && getNextStageNumber(stages, STAGE_TYPES.STAGE) !== numberOfStages + 1) {
            errors.push(FORM_ERRORS.STAGE_CONTINUITY);
        }
    }

    return errors;
};

const validateDescription = (description: MapTypes.IDisplayDescription) => description.text.length < MAX_DESCRIPTION_LENGTH;

const validateContributors = (contributors: MapTypes.IDisplayContributionGroup[]) => (
    !contributors.some((contributor) => contributor.contribution.length < 1)
)

const validateMapFiles = (mapFiles: MapTypes.IDisplayMapFile[]) => (
    !mapFiles.some(mapFile => mapFile.description.length === 0)
);

export const validateMapInfo = async (editMapState: MapTypes.IDisplayMap, mode: MODES): Promise<string[]> => {
    let errors: string[] = [];

    errors = [...errors, ...await validateMapName(editMapState.mapName, mode)]
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
    errors = [...errors, ...validateStages(editMapState.stages, editMapState.mapType)];
    if (!validateDescription(editMapState.description)) {
        errors.push(FORM_ERRORS.DESCRIPTION);
    }
    if (!validateContributors(editMapState.contributors)) {
        errors.push(FORM_ERRORS.CONTRIBUTORS);
    }
    if (!validateMapFiles(editMapState.mapFiles)) {
        errors.push(FORM_ERRORS.MAP_FILES);
    }

    return errors;
};
