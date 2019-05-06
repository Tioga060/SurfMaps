import * as T from 'shared/types';
import get from 'lodash/get';
import { IState as IEditMapState, IEditStage, IEditMapFile, IContributor } from './components/EditMapDrawerContent/component';
import * as GQL from './services/gqlHelpers';
import { groupContributors } from '../../components/MapContributors';
import { sortStages } from '../../components/StageInfo';

export enum MAP_TYPES {
    STAGED = 'Staged',
    LINEAR = 'Linear',
}

export enum STAGE_TYPES {
    STAGE = 'Stage',
    LINEAR = 'Linear',
    BONUS = 'Bonus',
}

export const alreadyHasLinearSection = (stages: IEditStage[]): boolean => (
    stages.some((stage) => stage.stageType.name === STAGE_TYPES.LINEAR)
)

export const getStageTypeAndNumber = (stages: IEditStage[], stage: IEditStage, index: number) => {
    const stageTypeName = !!stage.stageType.name.length ? stage.stageType.name : STAGE_TYPES.STAGE;
    if (stageTypeName === STAGE_TYPES.LINEAR) {
        return {stageTypeName, stageNumber: -1};
    }
    const stageNumber = stages.slice(0, index).reduce((result, thisStage) => {
        if (stage.stageType.name === thisStage.stageType.name) {
            result += 1;
        }
        return result;
    }, 1);
    return {stageTypeName, stageNumber};
}

export const removeAllStages = (stages: IEditStage[], type: string = STAGE_TYPES.STAGE): IEditStage[] => (
    stages.filter((stage) => stage.stageType.name !== type)
);

// editMap => IMap

const userSteamInfoToIUser = (user: T.IUserSteamInfo) => ({
    rowId: user.userId,
    role: '',
    createdAt: '',
    userSteamInfosByUserId: {
        nodes: [user],
    },
});

const convertAuthors = (authors: T.IUserSteamInfo[]): T.IMapAuthorAsNodes => ({
    nodes: authors.map((author) => ({
        userByAuthorId: userSteamInfoToIUser(author),
    }))
});

export const convertContributors = (contributors: IContributor[]): T.IMapContributorAsNodes => {
    const contributorList: T.IMapContributor[] = [];
    contributors.map((contribution) => {
        contribution.userList.map((user) => {
            contributorList.push({
                contribution: contribution.contribution,
                userByUserId: userSteamInfoToIUser(user),
            });
        })
    })
    return {nodes: contributorList};
};

const convertStages = (stages: IEditStage[], currentUser: T.IUserSteamInfo): T.IStageAsNodes => ({
    nodes: stages.map((stage, index) => {
        const {stageNumber} = getStageTypeAndNumber(stages, stage, index);
        return {
            name: stage.name,
            number: stageNumber,
            stageTypeByStageTypeId: stage.stageType,
            userByAuthorId: userSteamInfoToIUser(get(stage, 'authors[0]', currentUser)),
            stageImagesByStageId: {nodes: []}, //TODO
        }
    })
});

const editFileToIFIle = (currentUser: T.IUserSteamInfo): T.IFile => ({
    rowId: '',
    storeLocation: '',
    createdAt: '',
    active: false,
    userByUploaderId: userSteamInfoToIUser(currentUser), // TODO
    fileTypeByFileTypeId: {
        type: '', // TODO
    }
});

const editMapFilesToIMapFile = (editFiles: IEditMapFile[], currentUser: T.IUserSteamInfo): T.IMapFileAsNodes => ({
    nodes: editFiles.map((file) => ({
        gameByGameId: file.game,
        label: file.description,
        fileByFileId: editFileToIFIle(currentUser),
    }))
});

const editDescriptionToIMapDescription = (description: string, currentUser: T.IUserSteamInfo): T.IMapDescrtionAsNodes => ({
    nodes: [{
        order: 0,
        textMarkdownByTextMarkdownId: {
            text: description,
            userByAuthorId: userSteamInfoToIUser(currentUser),
        }
    }]
});

export const convertEditStateToIMap = (editMapState: IEditMapState, currentUser: T.IUserSteamInfo): T.IMap => ({
    name: editMapState.mapName,
    createdAt: editMapState.releaseDate,
    gameModeByGameModeId: editMapState.gameMode,
    gameByGameId: editMapState.game,
    mapTypeByMapTypeId: editMapState.mapType,
    tier: editMapState.tier,
    mapAuthorsByMapId: convertAuthors(editMapState.authors),
    stagesByMapId: convertStages(editMapState.stages, currentUser),
    mapImagesByMapId: {nodes: []}, //TODO
    mapFilesByMapId: editMapFilesToIMapFile(editMapState.mapFiles, currentUser),
    mapDescriptionsByMapId: editDescriptionToIMapDescription(editMapState.description, currentUser),
    mapContributorsByMapId: convertContributors(editMapState.contributors),
});

// IMap => editMap

const convertIMapContributorsToEditMap = (contributors: T.IMapContributor[]): IContributor[] => {
    const groups = groupContributors(contributors);
    const contributions: IContributor[] = [];
    for (const contribution of Object.keys(groups)) {
        contributions.push({
            contribution,
            userList: groups[contribution].map((cont) => cont.userByUserId.userSteamInfosByUserId.nodes[0]),
        });
    }
    return contributions;
}

const convertIMapStagesToEditMap = (stages: T.IStage[]): IEditStage[] => {
    const sortedStages = sortStages(stages);
    return sortedStages.map((stage): IEditStage => ({
        name: stage.name || '',
        authors: [stage.userByAuthorId.userSteamInfosByUserId.nodes[0]],
        stageType: stage.stageTypeByStageTypeId,
        images: [], // TODO
    }));
}

export const convertIMapToEditState = (map: T.IMap): Partial<IEditMapState> => ({
    mapName: map.name,
    authors: map.mapAuthorsByMapId.nodes.map((author) => author.userByAuthorId.userSteamInfosByUserId.nodes[0]),
    tier: map.tier,
    gameMode: map.gameModeByGameModeId,
    game: map.gameByGameId,
    mapType: map.mapTypeByMapTypeId,
    description: get(map.mapDescriptionsByMapId.nodes, '[0].textMarkdownByTextMarkdownId.text', ''),
    contributors: convertIMapContributorsToEditMap(map.mapContributorsByMapId.nodes),
    stages: convertIMapStagesToEditMap(map.stagesByMapId.nodes),
    mainImage: [], // TODO
    mapImages: [], // TODO
    releaseDate: map.releasedAt || map.createdAt,
    mapFiles: [], // TODO
});

// Submission helpers

const createStageCallback = (refreshCallback: (mapId: string) => void, stages: GQL.IEditStageMutation[], index: number, stageList: string[] = []) => (response: GQL.ICreateStageResponse) => {
    submitStages(refreshCallback, stages, index + 1, [...stageList, response.createStage.stage.rowId])
}

const submitStages = (refreshCallback: (mapId: string) => void, stages: GQL.IEditStageMutation[], index: number = 0, stageList: string[] = []) => {
    refreshCallback(stages[0].stage.stage.mapId);
    if (index >= stages.length) {
        console.log(stageList);
    } else {
        GQL.createStage(stages[index], createStageCallback(refreshCallback, stages, index, stageList));
    }
}

const submitAuthors = (editMapState: IEditMapState, mapId: string, refreshCallback: (mapId: string) => void) => {
    const authors = GQL.editMapToAuthorMutation(editMapState, mapId);
    authors.forEach((author) => {
        GQL.createAuthor(author, mapId, refreshCallback);
    });
}

const submitDescription = (editMapState: IEditMapState, mapId: string, refreshCallback: (mapId: string) => void) => {
    if (editMapState.description.length > 0) {
        GQL.createDescription(GQL.editMapToDescription(editMapState), mapId, refreshCallback);
    }
}

const submitContributors = (editMapState: IEditMapState, mapId: string, refreshCallback: (mapId: string) => void) => {
    const contributions = GQL.editMapToContributors(editMapState, mapId);
    contributions.forEach((contribution) => {
        GQL.createMapContribution(contribution, refreshCallback);
    })
}

const createMapSubmitCallback = (editMapState: IEditMapState, refreshCallback: (mapId: string) => void) => (response: GQL.ICreateMapResponse) => {
    submitAuthors(editMapState, response.createMap.map.rowId, refreshCallback);
    submitStages(refreshCallback, GQL.editMapToStageMutation(editMapState, response.createMap.map.rowId));
    submitDescription(editMapState, response.createMap.map.rowId, refreshCallback);
    submitContributors(editMapState, response.createMap.map.rowId, refreshCallback);
    refreshCallback(response.createMap.map.rowId);
}

export const submitMap = (editMapState: IEditMapState, refreshCallback: (mapId: string) => void) => {
    // TODO - add debounced callback to each one of these functions so it updates the page
    GQL.createMap(GQL.editMapToMapMutation(editMapState), createMapSubmitCallback(editMapState, refreshCallback));
};
