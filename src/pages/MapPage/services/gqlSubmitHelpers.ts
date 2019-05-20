import * as MapTypes from '../types';
import * as SubmitGQL from './SubmitMapGQL';
import { IUserSteamInfo } from 'shared/types';

export const createMap = (editMapState: MapTypes.IDisplayMap) => {
    const mapData: SubmitGQL.ICreateMapMutation = {
        map: {
            clientMutationId: editMapState.submitter.userId,
            map: {
                name: editMapState.mapName,
                gameModeId: editMapState.gameMode.rowId!,
                gameId: editMapState.game.rowId!,
                mapTypeId: editMapState.mapType.rowId!,
                uploaderId: editMapState.submitter.userId,
                tier: editMapState.tier,
            }
        }
    }
    if (editMapState.releaseDate.length > 1) {
        mapData.map.map.releasedAt = (new Date(editMapState.releaseDate)).toUTCString();
    }

    return SubmitGQL.createMap(mapData);
};

export const createAuthor = (author: IUserSteamInfo, mapId: string, clientMutationId: string) => {
    const data = {
        author: {
            clientMutationId,
            mapAuthor: {
                authorId: author.userId,
                mapId,
            }
        }
    };
    return SubmitGQL.createAuthor(data);
};

export const createStage = (stage: MapTypes.IDisplayStage, mapId: string, clientMutationId: string) => {
    const newStage: SubmitGQL.ICreateStageMutation = {
        stage: {
            clientMutationId,
            stage: {
                number: stage.number,
                mapId,
                stageTypeId: stage.stageType.rowId!,
                authorId: stage.authors[0].userId,
            }
        }
    }
    if (stage.name.length > 0) {
        newStage.stage.stage.name = stage.name;
    }

    return SubmitGQL.createStage(newStage);
};

export const createDescription = async (editMapState: MapTypes.IDisplayMap, mapId: string) => {
    const data = {
        description: {
            clientMutationId: editMapState.submitter.userId,
            textMarkdown: {
                text: editMapState.description.text,
                authorId: editMapState.submitter.userId,
            }
        }
    };
    const description = await SubmitGQL.createDescription(data)
    const descriptionData = {
        description: {
            clientMutationId: editMapState.submitter.userId,
            mapDescription: {
                mapId,
                textMarkdownId: description.createTextMarkdown.textMarkdown.rowId,
                order: 0,
            }
        }
    };
    return SubmitGQL.createMapDescription(descriptionData);
};

export const createMapContribution = (userId: string, text: string, mapId: string, clientMutationId: string) => {
    const data = {
        contribution: {
            clientMutationId,
            mapContributor: {
                mapId,
                userId,
                contribution: text,
            }
        }
    };
    return SubmitGQL.createContribution(data);
};

export const createImage = (uploaderId: string) => {
    const data = {
        image: {
            clientMutationId: uploaderId,
            image: {
                storeLocation: '',
                uploaderId
            }
        }
    }
    return SubmitGQL.createImage(data);
};

export const createMapImage = (
    mapId: string,
    clientMutationId: string,
    response: SubmitGQL.ICreateImageResponse,
    order: number,
    backgroundImage: boolean = false,
    primaryImage: boolean = false,
) => {
    const data = {
        image: {
            clientMutationId,
            mapImage: {
                mapId,
                imageId: response.createImage.image.rowId,
                backgroundImage,
                primaryImage,
                order,
            }
        }
    };
    return SubmitGQL.createMapImage(data);
};

export const createStageImage = (
    stageId: string,
    clientMutationId: string,
    response: SubmitGQL.ICreateImageResponse,
) => {
    const data = {
        image: {
            clientMutationId,
            stageImage: {
                stageId,
                imageId: response.createImage.image.rowId,
            }
        }
    };
    return SubmitGQL.createStageImage(data);
};

export const createFile = (uploaderId: string, fileTypeId: string) => {
    const data = {
        file: {
            clientMutationId: uploaderId,
            file: {
                storeLocation: '',
                uploaderId,
                fileTypeId,
            }
        }
    }
    return SubmitGQL.createFile(data);
};

export const createMapFile = (
    mapId: string,
    gameId: string,
    label: string,
    clientMutationId: string,
    response: SubmitGQL.ICreateFileResponse,
    isPrimary: boolean = false,
) => {
    const data = {
        file: {
            clientMutationId,
            mapFile: {
                mapId,
                fileId: response.createFile.file.rowId,
                gameId,
                label,
                isPrimary,
            }
        }
    };
    return SubmitGQL.createMapFile(data);
};
