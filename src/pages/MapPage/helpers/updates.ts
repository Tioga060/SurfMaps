import * as MapTypes from '../types';
import get from 'lodash/get';
import { IImageOption } from '../services/uploadImage';
import { IEditImage } from 'shared/components/ImageDropzone';

export const shouldUpdateMap = (originalMap: MapTypes.IDisplayMap, modifiedMap: MapTypes.IDisplayMap): boolean => (
    originalMap.mapName !== modifiedMap.mapName
        || originalMap.releaseDate !== modifiedMap.releaseDate
        || originalMap.game.name !== modifiedMap.game.name
        || originalMap.gameMode.name !== modifiedMap.gameMode.name
        || originalMap.mapType.name !== modifiedMap.mapType.name
        || originalMap.tier !== modifiedMap.tier
);

export const getCreatedAndDeletedAuthors = (originalMap: MapTypes.IDisplayMap, modifiedMap: MapTypes.IDisplayMap) => {
    const originalAuthorIds = originalMap.authors.map((author) => author.userId);
    const modifiedAuthorIds = modifiedMap.authors.map((author) => author.userId)
    const deletedAuthors = originalMap.authors.filter((x) => !modifiedAuthorIds.includes(x.userId));
    const createdAuthors = modifiedMap.authors.filter((x) => !originalAuthorIds.includes(x.userId));
    return {createdAuthors, deletedAuthors};
}

export const shouldUpdateDescription = (originalMap: MapTypes.IDisplayMap, modifiedMap: MapTypes.IDisplayMap): boolean => (
    originalMap.description !== modifiedMap.description
);

const shouldUpdateStage = (originalStage: MapTypes.IDisplayStage, modifiedStage: MapTypes.IDisplayStage): boolean => (
    JSON.stringify(originalStage) !== JSON.stringify(modifiedStage)
);

export const getCreatedModifiedAndDeletedStages = (originalMap: MapTypes.IDisplayMap, modifiedMap: MapTypes.IDisplayMap) => {
    const createdStages = modifiedMap.stages.filter((stage) => !stage.rowId);

    // If it still has a rowId, it must be an existing stage
    const remainingOriginalStages = modifiedMap.stages.filter((stage) => !!stage.rowId);
    const remainingOriginalStageIds = remainingOriginalStages.map((stage) => stage.rowId);
    const deletedStages = originalMap.stages.filter((stage) => !remainingOriginalStageIds.includes(stage.rowId))

    const modifiedStages = remainingOriginalStages.filter((modifiedStage) => {
        const originalStage = originalMap.stages.find((stage) => stage.rowId === modifiedStage.rowId);
        if (!originalStage) {
            return false;
        }
        return shouldUpdateStage(originalStage, modifiedStage);
    })

    return {createdStages, modifiedStages, deletedStages};
};

interface ITemporaryContribution {
    rowId?: string;
    userId: string;
    contribution: string;
}

export const flattenContributionsToTemp = (contributors: MapTypes.IDisplayContributionGroup[]) => {
    return contributors.reduce((conts: ITemporaryContribution[], contribution) => {
        const tempConts: ITemporaryContribution[] = contribution.contributionList.map((cont) => ({
            rowId: cont.rowId,
            userId: cont.user.userId,
            contribution: contribution.contribution,
        }))
        conts = [...conts, ...tempConts]
        return conts;
    }, []);
}

export const getCreatedModifiedAndDeletedContributions = (originalMap: MapTypes.IDisplayMap, modifiedMap: MapTypes.IDisplayMap) => {
    const originalContributions = flattenContributionsToTemp(originalMap.contributors);
    const modifiedMapContributions = flattenContributionsToTemp(modifiedMap.contributors);

    const remainingModifiedContributions = modifiedMapContributions.filter((cont) => !!cont.rowId);
    const modifiedContributionIds = remainingModifiedContributions.map((cont) => cont.rowId!);

    const createdContributions = modifiedMapContributions.filter((cont) => !cont.rowId);
    const modifiedContributions = remainingModifiedContributions.filter((cont) => {
        const originalContribution = originalContributions.find((origCont) => !!origCont.rowId && origCont.rowId === cont.rowId);
        if (!originalContribution) {
            return false;
        }
        return cont.contribution !== originalContribution.contribution;
    })
    const deletedContributions = originalContributions.filter((cont) => !modifiedContributionIds.includes(cont.rowId!));
    return { createdContributions, modifiedContributions, deletedContributions };
};

type IEditImageWithType = IEditImage & {
    stageId?: string;
}

const getAllImages = (map: MapTypes.IDisplayMap): IEditImageWithType[] => {
    const stageImages = map.stages.filter(stage => !!stage.images.length).map((stage) => ({stageId: stage.rowId!, ...stage.images[0]}));
    return [...map.mainImage, ...map.mapImages, ...stageImages];
};

export interface IOptionWithFile {
    options: IImageOption;
    file: File;
}

// TODO - you can only upload images on existing stages
const getImagesWithTypeInfo = (map: MapTypes.IDisplayMap) => {
    const stageImages: IOptionWithFile[] = map.stages.filter((stage) => !!stage.rowId && stage.images.length && !!stage.images[0].file).map((stage) => ({
        file: stage.images[0].file!,
        options: {stageId: stage.rowId},
    }));
    const headerImages: IOptionWithFile[] = map.mainImage.filter((image) => !!image.file).map((image) => ({
        file: image.file!,
        options: {
            order: -1,
            primaryImage: true,
            backgroundImage: true,
        }
    }));
    const mapImages: IOptionWithFile[] = map.mapImages.filter((image) => !!image.file).map((image, index) => ({
        file: image.file!!,
        options: {
            order: index,
        }
    }));
    return [...stageImages, ...headerImages, ...mapImages];
}

export const getCreatedAndDeletedImages = (originalMap: MapTypes.IDisplayMap, modifiedMap: MapTypes.IDisplayMap) => {
    const allOriginalImages = getAllImages(originalMap);
    const originalRemainingImages = allOriginalImages.filter((image) => !!image.rowId);
    const allModifiedImages = getAllImages(modifiedMap);
    const modifiedRemainingRowIds = allModifiedImages.filter((image) => !!image.rowId).map((image) => image.rowId!);
    const deletedImages = originalRemainingImages.filter((image) => !modifiedRemainingRowIds.includes(image.rowId!));
    const createdImages = getImagesWithTypeInfo(modifiedMap);
    return { createdImages, deletedImages };
};

const fileIsModified = (originalFile: MapTypes.IDisplayMapFile, modifiedFile: MapTypes.IDisplayMapFile) => (
    originalFile.description !== modifiedFile.description
        || originalFile.game !== modifiedFile.game
)

export const getAllCreatedModifiedAndDeletedFiles = (originalMap: MapTypes.IDisplayMap, modifiedMap: MapTypes.IDisplayMap) => {
    const remainingFiles = modifiedMap.mapFiles.filter(mapFile => !!get(mapFile, 'file[0].rowId'));
    const remainingFileIds = remainingFiles.map(mapFile => mapFile.file[0].rowId!);

    const deletedFiles = originalMap.mapFiles.filter((mapFile) => !remainingFileIds.includes(mapFile.file[0].rowId!));
    const createdFiles = modifiedMap.mapFiles.reduce((files: MapTypes.IDisplayMapFile[], mapFile) => {
        const file = get(mapFile, 'file[0].file');
        if(file) {
            files.push(mapFile);
        }
        return files;
    }, []);

    const modifiedFiles = remainingFiles.filter(modifiedFile => {
        const originalFile = originalMap.mapFiles.find(mapFile => !!mapFile.file[0].rowId && mapFile.file[0].rowId === modifiedFile.file[0].rowId);
        if (originalFile) {
            return fileIsModified(originalFile, modifiedFile);
        }
        return false;
    });

    return {createdFiles, modifiedFiles, deletedFiles};
};
