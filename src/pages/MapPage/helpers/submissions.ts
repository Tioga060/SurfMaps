import { generateSas } from 'shared/resources/azure';
import * as MapTypes from '../types';
import * as GQLSubmit from '../services/gqlSubmitHelpers';
import * as GQLUpdate from '../services/gqlUpdateHelpers';
import * as UpdateHelpers from './updates';
import { uploadImages } from '../services/uploadImage';
import { uploadFiles } from '../services/uploadFile';

export const submitMap = async (editMapState: MapTypes.IDisplayMap) => {
    const response = await GQLSubmit.createMap(editMapState);
    const mapId = response.createMap.map.rowId;
    const submitterId = editMapState.submitter.userId;

    const authorPromises = editMapState.authors.map((author) => (
        GQLSubmit.createAuthor(author, mapId, submitterId)
    ))

    const stagePromises = editMapState.stages.map((stage) => (
        GQLSubmit.createStage(stage, mapId, submitterId)
    ));

    const descriptionPromise = GQLSubmit.createDescription(editMapState, mapId);

    const contributionPromises = UpdateHelpers.flattenContributionsToTemp(editMapState.contributors).map((contribution) => (
        GQLSubmit.createMapContribution(contribution.userId, contribution.contribution, mapId, submitterId)
    ));
    const containerPromise = generateSas(mapId, true);
    const results = await Promise.all([
        ...authorPromises,
        ...stagePromises,
        descriptionPromise,
        ...contributionPromises,
        containerPromise
    ]);
    console.log(results);
    return mapId;
};

export const modifyMap = async (originalMap: MapTypes.IDisplayMap, modifiedMap: MapTypes.IDisplayMap) => {
    const mapId = modifiedMap.mapId!;
    const submitterId = modifiedMap.submitter.userId;

    const conditionalPromises: Promise<any>[] = [];
    if (UpdateHelpers.shouldUpdateMap(originalMap, modifiedMap)) {
        conditionalPromises.push(GQLUpdate.updateMap(modifiedMap));
    }

    const {createdAuthors, deletedAuthors} = UpdateHelpers.getCreatedAndDeletedAuthors(originalMap, modifiedMap);
    const authorPromises = [
        ...createdAuthors.map((author) => (
            GQLSubmit.createAuthor(author, mapId, submitterId)
        )),
        ...deletedAuthors.map((author) => (
            GQLUpdate.deleteAuthor(author.userId, mapId, submitterId)
        )),
    ];

    if (UpdateHelpers.shouldUpdateDescription(originalMap, modifiedMap)) {
        conditionalPromises.push(GQLUpdate.updateDescription(modifiedMap.description, submitterId));
    }

    const { createdContributions, modifiedContributions, deletedContributions } = UpdateHelpers.getCreatedModifiedAndDeletedContributions(originalMap, modifiedMap);
    const contributionPromises = [
        ...createdContributions.map((contribution) => (
            GQLSubmit.createMapContribution(contribution.userId, contribution.contribution, mapId, submitterId)
        )),
        ...modifiedContributions.map((contribution) => (
            GQLUpdate.updateContribution(contribution.contribution, contribution.rowId!, submitterId)
        )),
        ...deletedContributions.map((contribution) => (
            GQLUpdate.deleteContribution(contribution.rowId!, submitterId)
        )),
    ];

    const { createdImages, deletedImages } = UpdateHelpers.getCreatedAndDeletedImages(originalMap, modifiedMap);
    const createdImagePromises = uploadImages(createdImages, mapId, submitterId);
    const deletedImagePromises: Promise<any>[] = [];
    deletedImages.forEach((image) => {
        if (image.stageId) {
            deletedImagePromises.push(GQLUpdate.deleteStageImage(image.rowId!, image.stageId!, submitterId));
        } else {
            deletedImagePromises.push(GQLUpdate.deleteMapImage(image.rowId!, mapId, submitterId));
        }
        deletedImagePromises.push(GQLUpdate.updateImage(image.rowId!, true, submitterId));
    });

    const { createdFiles,  modifiedFiles, deletedFiles } = UpdateHelpers.getAllCreatedModifiedAndDeletedFiles(originalMap, modifiedMap);
    const createdFilePromises = uploadFiles(createdFiles, mapId, submitterId);
    const modifiedFilePromises = modifiedFiles.map(file => (
        GQLUpdate.updateMapFile(file, mapId, submitterId)
    ));
    const deletedFilePromises: Promise<any>[] = [];
    deletedFiles.forEach(file => {
        deletedFilePromises.push(GQLUpdate.deleteMapFile(file.file[0].rowId!, mapId, submitterId));
        deletedFilePromises.push(GQLUpdate.updateFile(file.file[0].rowId!, submitterId, true));
    });

    const {createdStages, modifiedStages, deletedStages} = UpdateHelpers.getCreatedModifiedAndDeletedStages(originalMap, modifiedMap);
    const stagePromises = [
        ...createdStages.map((stage) => (
            GQLSubmit.createStage(stage, mapId, submitterId)
        )),
        ...modifiedStages.map((stage) => (
            GQLUpdate.updateStage(stage, submitterId)
        )),
    ];

    await Promise.all(deletedImagePromises);
    // have to delete stage images before deleting the stage
    const deletedStagePromises = deletedStages.map((stage) => (
        GQLUpdate.deleteStage(stage, submitterId)
    ));

    return await Promise.all([
        ...conditionalPromises,
        ...authorPromises,
        ...contributionPromises,
        ...deletedImagePromises,
        ...modifiedFilePromises,
        ...deletedFilePromises,
        ...stagePromises,
        ...deletedStagePromises,
        ...(await createdImagePromises),
        ...(await createdFilePromises),
    ]);
};
