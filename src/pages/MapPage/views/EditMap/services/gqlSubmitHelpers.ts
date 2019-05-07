import { commitMutation } from 'react-relay';
import { IState as IEditMapState } from '../components/EditMapDrawerContent/component';
import { convertContributors } from '../helpers';
import { submitMap, submitAuthor, submitStage, submitDescription, submitMapDescription, submitContribution } from './SubmitMapGQL';
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

export interface IEditAuthorMutation {
    author: {
        clientMutationId: string;
        mapAuthor: {
            authorId: string;
            mapId: string;
        }
    }
}

export const editMapToAuthorMutation = (editMapState: IEditMapState, mapId: string): IEditAuthorMutation[] => (
    editMapState.authors.map((author): IEditAuthorMutation => ({
        author: {
            clientMutationId: editMapState.submitter.userId,
            mapAuthor: {
                authorId: author.userId,
                mapId,
            }
        }
    }))
);

export const createAuthor = (authorData: IEditAuthorMutation, mapId: string, callBack: (mapId: string) => void) => {
    commitMutation(
        environment,
        {
            mutation: submitAuthor,
            variables: authorData,
            onCompleted: (response: ICreateMapResponse, errors) => {
                callBack(mapId);
            },
            onError: (error) => {
                console.log(error) // TODO
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
    editMapState.stages.map((stage): IEditStageMutation => {
        const newStage: IEditStageMutation = {
            stage: {
                clientMutationId: editMapState.submitter.userId,
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

export const createDescription = (description: IEditDescriptionMutation, mapId: string, callBack: (mapId: string) => void) => {
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
                }, callBack);
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

const createMapDescription = (description: IEditMapDescriptionMutation, callBack: (mapId: string) => void) => {
    commitMutation(
        environment,
        {
            mutation: submitMapDescription,
            variables: description,
            onCompleted: (response, errors) => {
                callBack(description.description.mapDescription.mapId);
            },
            onError: (error) => {
                console.log(error);
            },
        } 
    )
}

interface IEditMapContributionMutation {
    contribution: {
        clientMutationId: string;
        mapContributor: {
            mapId: string;
            userId: string;
            contribution: string;
        }
    }
}

export const editMapToContributors = (editMapState: IEditMapState, mapId: string): IEditMapContributionMutation[] => {
    const contributors = convertContributors(editMapState.contributors);
    return contributors.nodes.map((contribution) => ({
        contribution: {
            clientMutationId: editMapState.submitter.userId,
            mapContributor: {
                mapId,
                userId: contribution.userByUserId.rowId,
                contribution: contribution.contribution,
            }
        }
    }))
};

export const createMapContribution = (contribution: IEditMapContributionMutation, callBack: (mapId: string) => void) => {
    commitMutation(
        environment,
        {
            mutation: submitContribution,
            variables: contribution,
            onCompleted: (response, errors) => {
                callBack(contribution.contribution.mapContributor.mapId);
            },
            onError: (error) => {
                console.log(error);
            },
        } 
    )
}
