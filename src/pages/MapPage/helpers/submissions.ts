import * as MapTypes from '../types';
import * as GQLSubmit from '../services/gqlSubmitHelpers';
import { ICreateMapResponse } from '../services/SubmitMapGQL';
import * as GQLUpdate from '../services/gqlUpdateHelpers';
import * as UpdateHelpers from './updates';
import { uploadImage } from 'shared/resources/uploadImage';

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
        GQLSubmit.createDescription(editMapState, mapId, callBack);
    }

    UpdateHelpers.flattenContributionsToTemp(editMapState.contributors).forEach((contribution) => {
        GQLSubmit.createMapContribution(contribution.userId, contribution.contribution, mapId, submitterId, callBack);
    });

    callBack();
}

export const submitMap = (editMapState: MapTypes.IDisplayMap, refreshCallback: (mapId: string) => void) => {
    GQLSubmit.createMap(editMapState, createMapSubmitCallback(editMapState, refreshCallback));
};

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
        if (!modifiedMap.description.rowId || modifiedMap.description.rowId.length < 36) {
            GQLSubmit.createDescription(modifiedMap, mapId, callBack);
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
};
