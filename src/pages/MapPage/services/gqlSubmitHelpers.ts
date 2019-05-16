import * as MapTypes from '../types';
import * as SubmitGQL from './SubmitMapGQL';
import { IUserSteamInfo } from 'shared/types';

export const createMap = (editMapState: MapTypes.IDisplayMap, callBack: (data: SubmitGQL.ICreateMapResponse) => void) => {
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

    SubmitGQL.createMap(mapData, callBack);
};

export const createAuthor = (author: IUserSteamInfo, mapId: string, clientMutationId: string, callBack: () => void) => {
    const data = {
        author: {
            clientMutationId,
            mapAuthor: {
                authorId: author.userId,
                mapId,
            }
        }
    };
    SubmitGQL.createAuthor(data, callBack);
};

export const createStage = (stage: MapTypes.IDisplayStage, mapId: string, clientMutationId: string, callBack: () => void) => {
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

    SubmitGQL.createStage(newStage, callBack);
};

export const createDescription = (editMapState: MapTypes.IDisplayMap, mapId: string, callBack: () => void) => {
    const data = {
        description: {
            clientMutationId: editMapState.submitter.userId,
            textMarkdown: {
                text: editMapState.description.text,
                authorId: editMapState.submitter.userId,
            }
        }
    };
    SubmitGQL.createDescription(data, (response: SubmitGQL.ICreateDescriptionResponse) => {
        const descriptionData = {
            description: {
                clientMutationId: editMapState.submitter.userId,
                mapDescription: {
                    mapId,
                    textMarkdownId: response.createTextMarkdown.textMarkdown.rowId,
                    order: 0,
                }
            }
        };
        console.log(descriptionData)
        SubmitGQL.createMapDescription(descriptionData, callBack);
    })
};

export const createMapContribution = (userId: string, text: string, mapId: string, clientMutationId: string, callBack: () => void) => {
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
    SubmitGQL.createContribution(data, callBack);
};

export const createImage = (uploaderId: string, cb: (response: SubmitGQL.ICreateImageResponse) => void) => {
    const data = {
        image: {
            clientMutationId: uploaderId,
            image: {
                storeLocation: '',
                uploaderId
            }
        }
    }
    SubmitGQL.createImage(data, cb);
};

export const createMapImage = (
    mapId: string,
    clientMutationId: string,
    response: SubmitGQL.ICreateImageResponse,
    order: number,
    callBack: () => void,
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
    SubmitGQL.createMapImage(data, callBack);
};

export const createStageImage = (
    stageId: string,
    clientMutationId: string,
    response: SubmitGQL.ICreateImageResponse,
    callBack: () => void,
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
    SubmitGQL.createStageImage(data, callBack);
};

export const createFile = (uploaderId: string, fileTypeId: string, cb: (response: SubmitGQL.ICreateFileResponse) => void) => {
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
    SubmitGQL.createFile(data, cb);
};

export const createMapFile = (
    mapId: string,
    gameId: string,
    label: string,
    clientMutationId: string,
    response: SubmitGQL.ICreateFileResponse,
    callBack: () => void,
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
    SubmitGQL.createMapFile(data, callBack);
};
