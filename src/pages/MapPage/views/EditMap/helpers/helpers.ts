import * as T from 'shared/types';
import get from 'lodash/get';
import * as MapTypes from '../../../types';
import * as GQLSubmit from '../services/gqlSubmitHelpers';
import { ICreateMapResponse } from '../services/SubmitMapGQL';
import * as GQLUpdate from '../services/gqlUpdateHelpers';
import * as UpdateHelpers from './updates';
import { IEditImage } from 'shared/components/ImageDropzone';
import { uploadImage } from 'shared/resources/uploadImage';
import { sortStages, STAGE_TYPES } from '../../../helpers';

export const alreadyHasLinearSection = (stages: MapTypes.IDisplayStage[]): boolean => (
    stages.some((stage) => stage.stageType.name === STAGE_TYPES.LINEAR)
)

export const removeAllStages = (stages: MapTypes.IDisplayStage[], type: string = STAGE_TYPES.STAGE): MapTypes.IDisplayStage[] => (
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

export const convertContributors = (contributors: MapTypes.IDisplayContributionGroup[]): T.IMapContributorAsNodes => {
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

const stageToIStageImage = (stage: MapTypes.IDisplayStage, currentUser: T.IUserSteamInfo): T.IStageImage[] => {
    const storeLocation = get(stage, 'images[0].storeLocation');
    if (storeLocation) {
        return [{imageByImageId: storeLocationToIImage(storeLocation, userSteamInfoToIUser(currentUser))}];
    }
    return [];
}

const convertStages = (stages: MapTypes.IDisplayStage[], currentUser: T.IUserSteamInfo): T.IStageAsNodes => ({
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

const editMapFilesToIMapFile = (editFiles: MapTypes.IDisplayMapFile[], currentUser: T.IUserSteamInfo): T.IMapFileAsNodes => ({
    nodes: editFiles.map((file) => ({
        gameByGameId: file.game,
        label: file.description,
        fileByFileId: editFileToIFIle(currentUser),
    }))
});

const editDescriptionToIMapDescription = (description: MapTypes.IDisplayDescription, currentUser: T.IUserSteamInfo): T.IMapDescrtionAsNodes => ({
    nodes: [{
        order: 0,
        textMarkdownByTextMarkdownId: {
            rowId: description.rowId,
            text: description.text,
            userByAuthorId: userSteamInfoToIUser(currentUser),
        }
    }]
});

const convertMapImagesToIMapImages = (editMapState: MapTypes.IDisplayMap): T.IMapImage[] => {
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

export const convertEditStateToIMap = (editMapState: MapTypes.IDisplayMap, currentUser: T.IUserSteamInfo): T.IMap => ({
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
    mapDescriptionsByMapId: editDescriptionToIMapDescription(editMapState.description, currentUser),
    mapContributorsByMapId: convertContributors(editMapState.contributors),
});

// IMap => editMap
interface IContributorMap {
    [id: string]: T.IMapContributor[];
}

const groupContributors = (contributors: T.IMapContributor[]): IContributorMap => {
    return contributors.reduce((result: IContributorMap, contributor) => {
        (result[contributor.contribution] = result[contributor.contribution] || []).push(contributor);
        return result;
    }, {})
}

const convertIMapContributorsToEditMap = (contributors: T.IMapContributor[]): MapTypes.IDisplayContributionGroup[] => {
    const groups = groupContributors(contributors);
    const contributions: MapTypes.IDisplayContributionGroup[] = [];
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

const convertIMapStagesToEditMap = (stages: T.IStage[]): MapTypes.IDisplayStage[] => {
    const displayStages = stages.map((stage): MapTypes.IDisplayStage => ({
        rowId: stage.rowId,
        name: stage.name!,
        number: stage.number,
        authors: [stage.userByAuthorId.userSteamInfoByUserId],
        stageType: stage.stageTypeByStageTypeId,
        images: convertIMapImagesToEditImage(stage.stageImagesByStageId.nodes),
    }));
    return sortStages(displayStages);
}

export const convertIMapToEditState = (map: T.IMap): MapTypes.IDisplayMap => ({
    mapId: map.rowId,
    mapName: map.name,
    authors: map.mapAuthorsByMapId.nodes.map((author) => author.userByAuthorId.userSteamInfoByUserId),
    tier: map.tier,
    gameMode: map.gameModeByGameModeId,
    game: map.gameByGameId,
    mapType: map.mapTypeByMapTypeId,
    description: {...get(map.mapDescriptionsByMapId.nodes, '[0].textMarkdownByTextMarkdownId', {text: ''})},
    contributors: convertIMapContributorsToEditMap(map.mapContributorsByMapId.nodes),
    stages: convertIMapStagesToEditMap(map.stagesByMapId.nodes),
    mainImage: convertIMapImagesToEditImage(map.mapImagesByMapId.nodes, true),
    mapImages: convertIMapImagesToEditImage(map.mapImagesByMapId.nodes),
    releaseDate: map.releasedAt || map.createdAt,
    mapFiles: [], // TODO
    submitter: get(map, 'userByUploaderId.userSteamInfoByUserId'),
});

// Submission helpers

const createMapSubmitCallback = (editMapState: MapTypes.IDisplayMap, refreshCallback: (mapId: string) => void) => (response: ICreateMapResponse) => {
    const mapId = response.createMap.map.rowId;
    const submitterId = editMapState.submitter.userId;
    const callBack = () => { refreshCallback(mapId); }

    editMapState.authors.forEach((author) => {
        GQLSubmit.createAuthor(author, mapId, submitterId, callBack);
    })

    editMapState.stages.forEach((stage) => {
        GQLSubmit.createStage(stage, mapId, submitterId, callBack);
    })

    if (editMapState.description.text.length > 0) {
        GQLSubmit.createDescription(editMapState, callBack);
    }

    UpdateHelpers.flattenContributionsToTemp(editMapState.contributors).forEach((contribution) => {
        GQLSubmit.createMapContribution(contribution.userId, contribution.contribution, mapId, submitterId, callBack);
    });

    callBack();
}

export const submitMap = (editMapState: MapTypes.IDisplayMap, refreshCallback: (mapId: string) => void) => {
    GQLSubmit.createMap(editMapState, createMapSubmitCallback(editMapState, refreshCallback));
};

// Modifiy map

export const modifyMap = (originalMap: MapTypes.IDisplayMap, modifiedMap: MapTypes.IDisplayMap, refreshCallback: (mapId: string) => void) => {
    const mapId = modifiedMap.mapId!;
    const submitterId = modifiedMap.submitter.userId;
    const callBack = () => { refreshCallback(mapId) };
    if (UpdateHelpers.shouldUpdateMap(originalMap, modifiedMap)) {
        GQLUpdate.updateMap(modifiedMap, callBack);
    }

    const {createdAuthors, deletedAuthors} = UpdateHelpers.getCreatedAndDeletedAuthors(originalMap, modifiedMap);
    createdAuthors.forEach((author) => {
        GQLSubmit.createAuthor(author, mapId, submitterId, callBack);
    });
    deletedAuthors.forEach((author) => {
        GQLUpdate.deleteAuthor(author.userId, mapId, submitterId, callBack)
    });

    const {createdStages, modifiedStages, deletedStages} = UpdateHelpers.getCreatedModifiedAndDeletedStages(originalMap, modifiedMap);
    createdStages.forEach((stage) => {
        GQLSubmit.createStage(stage, mapId, submitterId, callBack);
    });
    modifiedStages.forEach((stage) => {
        GQLUpdate.updateStage(stage, submitterId, callBack);
    });
    deletedStages.forEach((stage) => {
        GQLUpdate.deleteStage(stage, submitterId, callBack);
    });

    if (UpdateHelpers.shouldUpdateDescription(originalMap, modifiedMap)) {
        if (modifiedMap.description.rowId && modifiedMap.description.rowId.length < 36) {
            GQLSubmit.createDescription(modifiedMap, callBack);
        } else {
            GQLUpdate.updateDescription(modifiedMap.description, submitterId, callBack);
        }
    }

    const { createdContributions, modifiedContributions, deletedContributions } = UpdateHelpers.getCreatedModifiedAndDeletedContributions(originalMap, modifiedMap);
    createdContributions.forEach((contribution) => {
        GQLSubmit.createMapContribution(contribution.userId, contribution.contribution, mapId, submitterId, callBack);
    });
    modifiedContributions.forEach((contribution) => {
        GQLUpdate.updateContribution(contribution.contribution, contribution.rowId!, submitterId, callBack);
    });
    deletedContributions.forEach((contribution) => {
        GQLUpdate.deleteContribution(contribution.rowId!, submitterId, callBack);
    });

    const { createdImages, deletedImages } = UpdateHelpers.getCreatedAndDeletedImages(originalMap, modifiedMap);
    createdImages.forEach((image) => {
        uploadImage(image.file, image.options, (response) => {
            callBack();
        })
    });
    deletedImages.forEach((image) => {
        if (image.stageId) {
            GQLUpdate.deleteStageImage(image.rowId!, image.stageId!, submitterId, callBack);
        } else {
            GQLUpdate.deleteMapImage(image.rowId!, mapId, submitterId, callBack);
        }
    })
}
