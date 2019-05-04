import { commitMutation } from 'react-relay';
import { IState as IEditMapState } from '../components/EditMapDrawerContent/component';
import { getStageTypeAndNumber } from '../helpers';
import { submitMap } from './SubmitMapGQL';
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

export const createMap = (mapData: IEditMapMutation) => {
    commitMutation(
        environment,
        {
            mutation: submitMap,
            variables: mapData,
            onCompleted: (response, errors) => {
                console.log(response);
            },
            onError: (error) => {
                console.log(error)
            },
        } 
    )
};

interface IEditMapStage {
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

export const editMapToStages = (editMapState: IEditMapState, mapId: string): IEditMapStage[] => (
    editMapState.stages.map((stage, index): IEditMapStage => {
        const { stageNumber } = getStageTypeAndNumber(editMapState.stages, stage, index);
        const newStage: IEditMapStage = {
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
