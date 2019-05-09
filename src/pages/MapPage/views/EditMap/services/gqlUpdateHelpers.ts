import { commitMutation } from 'react-relay';
import { IState as IEditMapState, IEditStage, IEditContribution } from '../components/EditMapDrawerContent/component';
import * as GQLUpdate from './UpdateMapGQL';
import { batchEnvironment } from 'shared/resources/graphql';
import { IUserSteamInfo } from 'shared/types';
// map
// stage
// description
// contributors

interface IUpdateMapMutation {
    map: {
        clientMutationId: string;
        rowId: string;
        mapPatch: {
            name?: string;
            gameModeId?: string;
            gameId?: string;
            mapTypeId?: string;
            tier?: number;
            releasedAt?: string;
        }
    }
}

export const editMapToUpdateMapMutation = (editMapState: IEditMapState): IUpdateMapMutation => ({
    map: {
        clientMutationId: editMapState.submitter.userId,
        rowId: editMapState.mapId,
        mapPatch: {
            name: editMapState.mapName,
            gameModeId: editMapState.gameMode.rowId,
            gameId: editMapState.game.rowId,
            mapTypeId: editMapState.mapType.rowId,
            tier: editMapState.tier,
            releasedAt: editMapState.releaseDate,
        }
    }
});

export const modifyMap = (mapData: IUpdateMapMutation, callBack: (mapId: string) => void) => {
    commitMutation(
        batchEnvironment,
        {
            mutation: GQLUpdate.updateMap,
            variables: mapData,
            onCompleted: (response) => {
                callBack(mapData.map.rowId);
            },
            onError: (error) => {
                console.log(error)
            },
        } 
    )
};

interface IDeleteAuthorMutation {
    author: {
        clientMutationId: string;
        authorId: string;
        mapId: string;
    }
}

export const authorToDeleteAuthorMutation = (author: IUserSteamInfo, mapId: string, uploaderId: string): IDeleteAuthorMutation => ({
    author: {
        clientMutationId: uploaderId,
        authorId: author.userId,
        mapId,
    }
});

export const deleteAuthor = (author: IDeleteAuthorMutation, callBack: () => void) => {
    commitMutation(
        batchEnvironment,
        {
            mutation: GQLUpdate.deleteAuthor,
            variables: author,
            onCompleted: (response) => {
                callBack();
            },
            onError: (error) => {
                console.log(error)
            },
        } 
    )
};

interface IUpdateStageMutation {
    stage: {
        clientMutationId: string;
        rowId: string;
        stagePatch: {
            name?: string;
            number?: number;
            stageTypeId?: string;
            authorId?: string;
        }
    }
};

export const stageToUpdateStageMutation = (stage: IEditStage, uploaderId: string): IUpdateStageMutation => ({
    stage: {
        clientMutationId: uploaderId,
        rowId: stage.rowId!,
        stagePatch: {
            name: stage.name,
            number: stage.number,
            stageTypeId: stage.stageType.rowId,
            authorId: stage.authors[0].userId,
        }
    }
});

export const modifyStage = (stage: IUpdateStageMutation, callBack: () => void) => {
    commitMutation(
        batchEnvironment,
        {
            mutation: GQLUpdate.updateStage,
            variables: stage,
            onCompleted: (response) => {
                callBack();
            },
            onError: (error) => {
                console.log(error)
            },
        } 
    )
};

interface IDeleteStageMutation {
    stage: {
        clientMutationId: string;
        rowId: string;
    }
}

export const stageToDeleteStageMutation = (stage: IEditStage, uploaderId: string): IDeleteStageMutation => ({
    stage: {
        clientMutationId: uploaderId,
        rowId: stage.rowId!,
    }
});

export const deleteStage = (stage: IDeleteStageMutation, callBack: () => void) => {
    commitMutation(
        batchEnvironment,
        {
            mutation: GQLUpdate.deleteStage,
            variables: stage,
            onCompleted: (response) => {
                callBack();
            },
            onError: (error) => {
                console.log(error)
            },
        } 
    )
};

interface IUpdateDescriptionMutation {
    description: {
        clientMutationId: string;
        rowId: string;
        textMarkdownPatch: {
            text?: string;
        }
    }
}

export const descriptionToDescriptionMutation = (description: string, rowId: string, uploaderId: string): IUpdateDescriptionMutation => ({
    description: {
        clientMutationId: uploaderId,
        rowId,
        textMarkdownPatch: {
            text: description,
        }
    }
});

export const updateDescription = (description: IUpdateDescriptionMutation, callBack: () => void) => {
    commitMutation(
        batchEnvironment,
        {
            mutation: GQLUpdate.updateDescription,
            variables: description,
            onCompleted: (response) => {
                callBack();
            },
            onError: (error) => {
                console.log(error)
            },
        } 
    )
};

interface IDeleteContributionMutation {
    contribution: {
        clientMutationId: string;
        rowId: string;
    }
}

export const contributionToDeleteMutation = (rowId: string, uploaderId: string): IDeleteContributionMutation => ({
    contribution: {
        clientMutationId: uploaderId,
        rowId,
    }
});

export const deleteContribution = (contribution: IDeleteContributionMutation, callBack: () => void) => {
    commitMutation(
        batchEnvironment,
        {
            mutation: GQLUpdate.deleteContribution,
            variables: contribution,
            onCompleted: (response) => {
                callBack();
            },
            onError: (error) => {
                console.log(error)
            },
        } 
    )
};

interface IDeleteMapImageMutation {
    image: {
        clientMutationId: string;
        imageId: string;
        mapId: string;
    }
}

export const mapImageToDeleteMapImageMutation = (imageId: string, mapId: string, uploaderId: string): IDeleteMapImageMutation => ({
    image: {
        clientMutationId: uploaderId,
        imageId,
        mapId,
    }
});

export const deleteMapImage = (image: IDeleteMapImageMutation, callBack: () => void) => {
    commitMutation(
        batchEnvironment,
        {
            mutation: GQLUpdate.deleteMapImage,
            variables: image,
            onCompleted: (response) => {
                callBack();
            },
            onError: (error) => {
                console.log(error)
            },
        } 
    )
};

interface IDeleteStageImageMutation {
    image: {
        clientMutationId: string;
        imageId: string;
        stageId: string;
    }
}

export const stageImageToDeleteStageImageMutation = (imageId: string, stageId: string, uploaderId: string): IDeleteStageImageMutation => ({
    image: {
        clientMutationId: uploaderId,
        imageId,
        stageId,
    }
});

export const deleteStageImage = (image: IDeleteStageImageMutation, callBack: () => void) => {
    commitMutation(
        batchEnvironment,
        {
            mutation: GQLUpdate.deleteStageImage,
            variables: image,
            onCompleted: (response) => {
                callBack();
            },
            onError: (error) => {
                console.log(error)
            },
        } 
    )
};
