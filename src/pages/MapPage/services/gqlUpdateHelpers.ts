import * as MapTypes from '../types';
import * as GQLUpdate from './UpdateMapGQL';

export const updateMap = (editMapState: MapTypes.IDisplayMap) => {
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
    return GQLUpdate.updateMap(data);
}

export const deleteAuthor = (authorId: string, mapId: string, clientMutationId: string) => {
    const data = {
        author: {
            clientMutationId,
            authorId,
            mapId,
        }
    };
    return GQLUpdate.deleteAuthor(data);
};

export const updateStage = (stage: MapTypes.IDisplayStage, clientMutationId: string) => {
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
    return GQLUpdate.updateStage(data);
};

export const deleteStage = (stage: MapTypes.IDisplayStage, clientMutationId: string) => {
    const data = {
        stage: {
            clientMutationId,
            rowId: stage.rowId!,
        }
    }
    return GQLUpdate.deleteStage(data);
};

export const updateDescription = (description: MapTypes.IDisplayDescription, clientMutationId: string) => {
    const data = {
        description: {
            clientMutationId,
            rowId: description.rowId!,
            textMarkdownPatch: {
                text: description.text,
            }
        }
    }
    return GQLUpdate.updateDescription(data);
};

export const updateContribution = (contribution: string, rowId: string, clientMutationId: string) => {
    const data = {
        contribution: {
            clientMutationId,
            rowId,
            mapContributorPatch: {
                contribution,
            }
        }
    }
    return GQLUpdate.updateContribution(data);
};

export const deleteContribution = (rowId: string, clientMutationId: string) => {
    const data = {
        contribution: {
            clientMutationId,
            rowId,
        }
    }
    return GQLUpdate.deleteContribution(data);
};

export const deleteMapImage = (imageId: string, mapId: string, clientMutationId: string) => {
    const data = {
        image: {
            clientMutationId,
            imageId,
            mapId,
        }
    }
    return GQLUpdate.deleteMapImage(data);
};

export const deleteStageImage = (imageId: string, stageId: string, clientMutationId: string) => {
    const data = {
        image: {
            clientMutationId,
            imageId,
            stageId,
        }
    }
    return GQLUpdate.deleteStageImage(data);
};

export const updateMapFile = (mapFile: MapTypes.IDisplayMapFile, mapId: string, clientMutationId: string) =>  {
    const data = {
        mapFile: {
            clientMutationId,
            mapId,
            fileId: mapFile.file[0].rowId!,
            mapFilePatch: {
                gameId: mapFile.game.rowId!,
                label: mapFile.description,
            }
        }
    };
    return GQLUpdate.updateMapFile(data);
};

export const deleteMapFile = (fileId: string, mapId: string, clientMutationId: string) =>  {
    const data = {
        mapFile: {
            clientMutationId,
            mapId,
            fileId,
        }
    };
    return GQLUpdate.deleteMapFile(data);
};

export const updateImage = (rowId: string, isOrphan: boolean, clientMutationId: string) =>  {
    const data = {
        image: {
            clientMutationId,
            rowId,
            imagePatch: {
                isOrphan,
            }
        }
    };
    return GQLUpdate.updateImage(data);
};

export const updateFile = (rowId: string, clientMutationId: string, isOrphan: boolean = false, fileTypeId: string = undefined!) =>  {
    const data = {
        file: {
            clientMutationId,
            rowId,
            filePatch: {
                isOrphan,
                fileTypeId, // TODO - edit security policy to allow this
            }
        }
    };
    return GQLUpdate.updateFile(data);
};
