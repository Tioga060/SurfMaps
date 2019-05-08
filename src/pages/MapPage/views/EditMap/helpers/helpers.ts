import * as T from 'shared/types';
import get from 'lodash/get';
import { IState as IEditMapState, IEditStage, IEditMapFile, IContributor } from '../components/EditMapDrawerContent/component';
import * as GQLSubmit from '../services/gqlSubmitHelpers';
import * as GQLUpdate from '../services/gqlUpdateHelpers';
import * as UpdateHelpers from './updates';
import { groupContributors } from '../../../components/MapContributors';
import { sortStages } from '../../../components/StageInfo';
import { IEditImage } from 'shared/components/ImageDropzone';
import { uploadImage } from 'shared/resources/uploadImage';

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

export const removeAllStages = (stages: IEditStage[], type: string = STAGE_TYPES.STAGE): IEditStage[] => (
    stages.filter((stage) => stage.stageType.name !== type)
);

// editMap => IMap

const userSteamInfoToIUser = (user: T.IUserSteamInfo) => ({
    rowId: user.userId,
    role: '',
    createdAt: '',
    userSteamInfoByUserId: user,
});

const convertAuthors = (authors: T.IUserSteamInfo[]): T.IMapAuthorAsNodes => ({
    nodes: authors.map((author) => ({
        userByAuthorId: userSteamInfoToIUser(author),
    }))
});

export const convertContributors = (contributors: IContributor[]): T.IMapContributorAsNodes => {
    const contributorList: T.IMapContributor[] = [];
    contributors.map((contribution) => {
        contribution.contributionList.map((cont) => {
            contributorList.push({
                rowId: cont.rowId,
                contribution: contribution.contribution,
                userByUserId: userSteamInfoToIUser(cont.user),
            });
        })
    })
    return {nodes: contributorList};
};

const storeLocationToIImage = (storeLocation: string, userByUploaderId: T.IUser): T.IImage => ({
    storeLocation,
    userByUploaderId,
    uploadedAt: '',
});

const stageToIStageImage = (stage: IEditStage, currentUser: T.IUserSteamInfo): T.IStageImage[] => {
    const storeLocation = get(stage, 'images[0].storeLocation');
    if (storeLocation) {
        return [{imageByImageId: storeLocationToIImage(storeLocation, userSteamInfoToIUser(currentUser))}];
    }
    return [];
}

const convertStages = (stages: IEditStage[], currentUser: T.IUserSteamInfo): T.IStageAsNodes => ({
    nodes: stages.map((stage) => ({
        rowId: stage.rowId,
        name: stage.name,
        number: stage.number,
        stageTypeByStageTypeId: stage.stageType,
        userByAuthorId: userSteamInfoToIUser(get(stage, 'authors[0]', currentUser)),
        stageImagesByStageId: {nodes: stageToIStageImage(stage, currentUser)},
    }))
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

const editDescriptionToIMapDescription = (description: string, descriptionId: string, currentUser: T.IUserSteamInfo): T.IMapDescrtionAsNodes => ({
    nodes: [{
        order: 0,
        textMarkdownByTextMarkdownId: {
            rowId: descriptionId,
            text: description,
            userByAuthorId: userSteamInfoToIUser(currentUser),
        }
    }]
});

const convertMapImagesToIMapImages = (editMapState: IEditMapState): T.IMapImage[] => {
    const uploader = userSteamInfoToIUser(editMapState.submitter);

    const storeImages = editMapState.mapImages.filter((image) => !!image.storeLocation).map((image, index): T.IMapImage => ({
        order: index,
        imageByImageId: storeLocationToIImage(image.storeLocation!, uploader)
    }));

    const headerImageLocation = get(editMapState.mainImage, '[0].storeLocation');
    if (headerImageLocation) {
        const headerImage: T.IMapImage = {
            order: -1,
            imageByImageId: storeLocationToIImage(headerImageLocation, uploader),
            primaryImage: true,
            backgroundImage: true,
        }
        return [headerImage, ...storeImages];
    }
    return storeImages;
}

export const convertEditStateToIMap = (editMapState: IEditMapState, currentUser: T.IUserSteamInfo): T.IMap => ({
    name: editMapState.mapName,
    createdAt: editMapState.releaseDate,
    gameModeByGameModeId: editMapState.gameMode,
    gameByGameId: editMapState.game,
    mapTypeByMapTypeId: editMapState.mapType,
    tier: editMapState.tier,
    mapAuthorsByMapId: convertAuthors(editMapState.authors),
    stagesByMapId: convertStages(editMapState.stages, currentUser),
    mapImagesByMapId: {nodes: convertMapImagesToIMapImages(editMapState)}, //TODO
    mapFilesByMapId: editMapFilesToIMapFile(editMapState.mapFiles, currentUser),
    mapDescriptionsByMapId: editDescriptionToIMapDescription(editMapState.description, editMapState.descriptionId, currentUser),
    mapContributorsByMapId: convertContributors(editMapState.contributors),
});

// IMap => editMap

const convertIMapContributorsToEditMap = (contributors: T.IMapContributor[]): IContributor[] => {
    const groups = groupContributors(contributors);
    const contributions: IContributor[] = [];
    for (const contribution of Object.keys(groups)) {
        contributions.push({
            contribution,
            contributionList: groups[contribution].map((cont) => ({
                user: cont.userByUserId.userSteamInfoByUserId,
                rowId: cont.rowId,
            })),
        });
    }
    return contributions;
}

interface IGenericImage {
    imageByImageId: {
        storeLocation: string;
        rowId?: string;
    }
    primaryImage?: boolean;
}

const convertIMapImagesToEditImage = (images: IGenericImage[], headerOnly: boolean = false): IEditImage[] => {
    return images.filter(image => image.primaryImage === undefined || image.primaryImage === headerOnly).map((image) => ({
        storeLocation: image.imageByImageId.storeLocation,
        rowId: image.imageByImageId.rowId,
    }));
};

const convertIMapStagesToEditMap = (stages: T.IStage[]): IEditStage[] => {
    const sortedStages = sortStages(stages);
    return sortedStages.map((stage): IEditStage => ({
        rowId: stage.rowId,
        name: stage.name!,
        number: stage.number,
        authors: [stage.userByAuthorId.userSteamInfoByUserId],
        stageType: stage.stageTypeByStageTypeId,
        images: convertIMapImagesToEditImage(stage.stageImagesByStageId.nodes),
    }));
}

export const convertIMapToEditState = (map: T.IMap): Partial<IEditMapState> => ({
    mapId: map.rowId,
    mapName: map.name,
    authors: map.mapAuthorsByMapId.nodes.map((author) => author.userByAuthorId.userSteamInfoByUserId),
    tier: map.tier,
    gameMode: map.gameModeByGameModeId,
    game: map.gameByGameId,
    mapType: map.mapTypeByMapTypeId,
    description: get(map.mapDescriptionsByMapId.nodes, '[0].textMarkdownByTextMarkdownId.text', ''),
    descriptionId: get(map.mapDescriptionsByMapId.nodes, '[0].textMarkdownByTextMarkdownId.rowId', ''),
    contributors: convertIMapContributorsToEditMap(map.mapContributorsByMapId.nodes),
    stages: convertIMapStagesToEditMap(map.stagesByMapId.nodes),
    mainImage: convertIMapImagesToEditImage(map.mapImagesByMapId.nodes, true),
    mapImages: convertIMapImagesToEditImage(map.mapImagesByMapId.nodes),
    releaseDate: map.releasedAt || map.createdAt,
    mapFiles: [], // TODO
});

// Submission helpers

const createStageCallback = (refreshCallback: (mapId: string) => void, stages: GQLSubmit.IEditStageMutation[], index: number, stageList: string[] = []) => (response: GQLSubmit.ICreateStageResponse) => {
    submitStages(refreshCallback, stages, index + 1, [...stageList, response.createStage.stage.rowId])
}

const submitStages = (refreshCallback: (mapId: string) => void, stages: GQLSubmit.IEditStageMutation[], index: number = 0, stageList: string[] = []) => {
    refreshCallback(stages[0].stage.stage.mapId);
    if (index >= stages.length) {
        console.log(stageList);
    } else {
        GQLSubmit.createStage(stages[index], createStageCallback(refreshCallback, stages, index, stageList));
    }
}

const submitAuthors = (editMapState: IEditMapState, mapId: string, refreshCallback: (mapId: string) => void) => {
    const authors = GQLSubmit.editMapToAuthorMutation(editMapState, mapId);
    authors.forEach((author) => {
        GQLSubmit.createAuthor(author, mapId, refreshCallback);
    });
}

const submitDescription = (editMapState: IEditMapState, mapId: string, refreshCallback: (mapId: string) => void) => {
    if (editMapState.description.length > 0) {
        GQLSubmit.createDescription(GQLSubmit.editMapToDescription(editMapState), mapId, refreshCallback);
    }
}

const submitContributors = (editMapState: IEditMapState, mapId: string, refreshCallback: (mapId: string) => void) => {
    const contributions = GQLSubmit.editMapToContributors(editMapState, mapId);
    contributions.forEach((contribution) => {
        GQLSubmit.createMapContribution(contribution, refreshCallback);
    })
}

const createMapSubmitCallback = (editMapState: IEditMapState, refreshCallback: (mapId: string) => void) => (response: GQLSubmit.ICreateMapResponse) => {
    submitAuthors(editMapState, response.createMap.map.rowId, refreshCallback);
    submitStages(refreshCallback, GQLSubmit.editMapToStageMutation(editMapState, response.createMap.map.rowId));
    submitDescription(editMapState, response.createMap.map.rowId, refreshCallback);
    submitContributors(editMapState, response.createMap.map.rowId, refreshCallback);
    refreshCallback(response.createMap.map.rowId);
}

export const submitMap = (editMapState: IEditMapState, refreshCallback: (mapId: string) => void) => {
    GQLSubmit.createMap(GQLSubmit.editMapToMapMutation(editMapState), createMapSubmitCallback(editMapState, refreshCallback));
};

// Modifiy map

export const modifyMap = (originalMap: IEditMapState, modifiedMap: IEditMapState, refreshCallback: (mapId: string) => void) => {
    const callBack = () => { refreshCallback(modifiedMap.mapId) };
    if (UpdateHelpers.shouldUpdateMap(originalMap, modifiedMap)) {
        GQLUpdate.modifyMap(GQLUpdate.editMapToUpdateMapMutation(modifiedMap), callBack);
    }

    const {createdAuthors, deletedAuthors} = UpdateHelpers.getCreatedAndDeletedAuthors(originalMap, modifiedMap);
    createdAuthors.forEach((author) => {
        GQLSubmit.createAuthor(
            GQLSubmit.authorToAuthorMutation(author, modifiedMap.mapId, modifiedMap.submitter.userId),
            modifiedMap.mapId,
            refreshCallback,
        );
    });
    deletedAuthors.forEach((author) => {
        GQLUpdate.deleteAuthor(
            GQLUpdate.authorToDeleteAuthorMutation(author, modifiedMap.mapId, modifiedMap.submitter.userId),
            callBack,
        );
    });

    const {createdStages, modifiedStages, deletedStages} = UpdateHelpers.getCreatedModifiedAndDeletedStages(originalMap, modifiedMap);
    createdStages.forEach((stage) => {
        GQLSubmit.createStage(
            GQLSubmit.stageToStageMutation(stage, modifiedMap.mapId, modifiedMap.submitter.userId),
            callBack
        )
    });
    modifiedStages.forEach((stage) => {
        GQLUpdate.modifyStage(
            GQLUpdate.stageToUpdateStageMutation(stage, modifiedMap.submitter.userId),
            callBack
        )
    });
    deletedStages.forEach((stage) => {
        GQLUpdate.deleteStage(
            GQLUpdate.stageToDeleteStageMutation(stage, modifiedMap.submitter.userId),
            callBack
        )
    });

    if (UpdateHelpers.shouldUpdateDescription(originalMap, modifiedMap)) {
        if (modifiedMap.descriptionId.length < 36) {
            GQLSubmit.createDescription(GQLSubmit.editMapToDescription(modifiedMap), modifiedMap.mapId, refreshCallback);
        } else {
            GQLUpdate.updateDescription(
                GQLUpdate.descriptionToDescriptionMutation(modifiedMap.description, modifiedMap.descriptionId, modifiedMap.submitter.userId),
                callBack
            )
        }
    }

    const { createdContributions, deletedContributions } = UpdateHelpers.getCreatedAndDeletedContributions(originalMap, modifiedMap);
    createdContributions.forEach((contribution) => {
        GQLSubmit.createMapContribution(
            GQLSubmit.contributionToCreateMutation(contribution.userId, contribution.contribution, modifiedMap.mapId, modifiedMap.submitter.userId),
            refreshCallback
        );
    });
    deletedContributions.forEach((contribution) => {
        GQLUpdate.deleteContribution(GQLUpdate.contributionToDeleteMutation(contribution.rowId!, modifiedMap.submitter.userId), callBack)
    })

    const { createdImages, deletedImages } = UpdateHelpers.getCreatedAndDeletedImages(originalMap, modifiedMap);
    createdImages.forEach((image) => {
        uploadImage(image.file, image.options, (response) => {
            callBack();
        })
    });
    deletedImages.forEach((image) => {
        if (image.stageId) {
            GQLUpdate.deleteStageImage(GQLUpdate.stageImageToDeleteStageImageMutation(image.rowId!, image.stageId!, modifiedMap.submitter.userId),
            callBack);
        } else {
            GQLUpdate.deleteMapImage(GQLUpdate.mapImageToDeleteMapImageMutation(image.rowId!, modifiedMap.mapId, modifiedMap.submitter.userId),
            callBack);
        }
    })
}
