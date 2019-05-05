import { commitMutation } from 'react-relay';
import { IState as IEditMapState } from '../components/EditMapDrawerContent/component';
import { getStageTypeAndNumber } from '../helpers';
import { submitMap, submitStage, submitDescription, submitMapDescription } from './SubmitMapGQL';
import environment from 'shared/resources/graphql';
// map
// stage
// description
// contributors

interface IEditMapMutation {
    map: {
        clientMutationId: string;
        map: {
            name: string;
            gameModeId: string;
            gameId: string;
            mapTypeId: string;
            uploaderId: string;
            tier: number;
            releasedAt?: string;
        }
    }
}

export const editMapToMapMutation = (editMapState: IEditMapState): IEditMapMutation => {
    const mapData: IEditMapMutation = {
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
    return mapData;
};

export interface ICreateMapResponse {
    createMap: {
        map: {
            rowId: string;
        }
    }
}

export const createMap = (mapData: IEditMapMutation, callBack: (response: ICreateMapResponse) => void) => {
    commitMutation(
        environment,
        {
            mutation: submitMap,
            variables: mapData,
            onCompleted: (response: ICreateMapResponse, errors) => {
                callBack(response);
            },
            onError: (error) => {
                console.log(error)
            },
        } 
    )
};

export interface IEditStageMutation {
    stage: {
        clientMutationId: string;
        stage: {
            name?: string;
            number: number;
            mapId: string;
            stageTypeId: string;
            authorId: string;
        }
    }
}

export const editMapToStageMutation = (editMapState: IEditMapState, mapId: string): IEditStageMutation[] => (
    editMapState.stages.map((stage, index): IEditStageMutation => {
        const { stageNumber } = getStageTypeAndNumber(editMapState.stages, stage, index);
        const newStage: IEditStageMutation = {
            stage: {
                clientMutationId: editMapState.submitter.userId,
                stage: {
                    number: stageNumber,
                    mapId,
                    stageTypeId: stage.stageType.rowId!,
                    authorId: stage.authors[0].userId,
                }
            }
        }
        if (stage.name.length > 0) {
            newStage.stage.stage.name = stage.name;
        }

        return newStage;
    })
);

export interface ICreateStageResponse {
    createStage: {
        stage: {
            rowId: string;
        }
    }
}

export const createStage = (stageData: IEditStageMutation, callBack: (response: ICreateStageResponse) => void) => {
    commitMutation(
        environment,
        {
            mutation: submitStage,
            variables: stageData,
            onCompleted: (response: ICreateStageResponse, errors) => {
                callBack(response);
            },
            onError: (error) => {
                callBack({
                    createStage: {
                        stage: {
                            rowId: error!.message || 'ERROR',
                        }
                    }
                });
            },
        } 
    )
};

export interface IEditDescriptionMutation {
    description: {
        clientMutationId: string;
        textMarkdown: {
            text: string;
            authorId: string;
        }
    }
}

export const editMapToDescription = (editMapState: IEditMapState): IEditDescriptionMutation => ({
    description: {
        clientMutationId: editMapState.submitter.userId,
        textMarkdown: {
            text: editMapState.description,
            authorId: editMapState.submitter.userId,
        }
    }
});

export interface ICreateDescriptionResponse {
    createTextMarkdown: {
        textMarkdown: {
            rowId: string;
        }
    }
}

export const createDescription = (description: IEditDescriptionMutation, mapId: string) => {
    commitMutation(
        environment,
        {
            mutation: submitDescription,
            variables: description,
            onCompleted: (response: ICreateDescriptionResponse, errors) => {
                createMapDescription({
                    description: {
                        clientMutationId: description.description.clientMutationId,
                        mapDescription: {
                            mapId,
                            textMarkdownId: response.createTextMarkdown.textMarkdown.rowId,
                            order: 0,
                        }
                    }
                });
            },
            onError: (error) => {
                console.log(error); // TODO, error handling for all of these
            },
        } 
    )
};

interface IEditMapDescriptionMutation {
    description: {
        clientMutationId: string;
        mapDescription: {
            mapId: string;
            textMarkdownId: string;
            order: number;
        }
    }
}

const createMapDescription = (description: IEditMapDescriptionMutation) => {
    commitMutation(
        environment,
        {
            mutation: submitMapDescription,
            variables: description,
            onCompleted: (response, errors) => {
                console.log(response);
            },
            onError: (error) => {
                console.log(error);
            },
        } 
    )
}
