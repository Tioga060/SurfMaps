import * as T from 'shared/types';
import get from 'lodash/get';
import { IState as IEditMapState, IEditStage, IEditMapFile, IContributor } from './components/EditMapDrawerContent/component';

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

const convertContributors = (contributors: IContributor[]): T.IMapContributorAsNodes => {
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
