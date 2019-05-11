import * as MapTypes from '../types';
import * as GQLUpdate from './UpdateMapGQL';

export const updateMap = (editMapState: MapTypes.IDisplayMap, callBack: () => void) => {
    const data = {
        map: {
            clientMutationId: editMapState.submitter.userId,
            rowId: editMapState.mapId!,
            mapPatch: {
                name: editMapState.mapName,
                gameModeId: editMapState.gameMode.rowId,
                gameId: editMapState.game.rowId,
                mapTypeId: editMapState.mapType.rowId,
                tier: editMapState.tier,
                releasedAt: editMapState.releaseDate,
            }
        }
    }
    GQLUpdate.updateMap(data, callBack);
}

export const deleteAuthor = (authorId: string, mapId: string, clientMutationId: string, callBack: () => void) => {
    const data = {
        author: {
            clientMutationId,
            authorId,
            mapId,
        }
    };
    GQLUpdate.deleteAuthor(data, callBack);
};

export const updateStage = (stage: MapTypes.IDisplayStage, clientMutationId: string, callBack: () => void) => {
    const data = {
        stage: {
            clientMutationId,
            rowId: stage.rowId!,
            stagePatch: {
                name: stage.name,
                number: stage.number,
                stageTypeId: stage.stageType.rowId,
                authorId: stage.authors[0].userId,
            }
        }
    }
    GQLUpdate.updateStage(data, callBack);
};

export const deleteStage = (stage: MapTypes.IDisplayStage, clientMutationId: string, callBack: () => void) => {
    const data = {
        stage: {
            clientMutationId,
            rowId: stage.rowId!,
        }
    }
    GQLUpdate.deleteStage(data, callBack);
};

export const updateDescription = (description: MapTypes.IDisplayDescription, clientMutationId: string, callBack: () => void) => {
    const data = {
        description: {
            clientMutationId,
            rowId: description.rowId!,
            textMarkdownPatch: {
                text: description.text,
            }
        }
    }
    GQLUpdate.updateDescription(data, callBack);
};

export const updateContribution = (contribution: string, rowId: string, clientMutationId: string, callBack: () => void) => {
    const data = {
        contribution: {
            clientMutationId,
            rowId,
            mapContributorPatch: {
                contribution,
            }
        }
    }
    GQLUpdate.updateContribution(data, callBack);
};

export const deleteContribution = (rowId: string, clientMutationId: string, callBack: () => void) => {
    const data = {
        contribution: {
            clientMutationId,
            rowId,
        }
    }
    GQLUpdate.deleteContribution(data, callBack);
};

export const deleteMapImage = (imageId: string, mapId: string, clientMutationId: string, callBack: () => void) => {
    const data = {
        image: {
            clientMutationId,
            imageId,
            mapId,
        }
    }
    GQLUpdate.deleteMapImage(data, callBack);
};

export const deleteStageImage = (imageId: string, stageId: string, clientMutationId: string, callBack: () => void) => {
    const data = {
        image: {
            clientMutationId,
            imageId,
            stageId,
        }
    }
    GQLUpdate.deleteStageImage(data, callBack);
};
