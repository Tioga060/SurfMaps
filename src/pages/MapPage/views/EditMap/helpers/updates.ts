import { IState as IEditMapState, IEditStage, IEditContribution } from '../components/EditMapDrawerContent/component';
import { IImageOption } from 'shared/resources/uploadImage';
import { IEditImage } from 'shared/components/ImageDropzone';

export const shouldUpdateMap = (originalMap: IEditMapState, modifiedMap: IEditMapState): boolean => (
    originalMap.mapName !== modifiedMap.mapName
        || originalMap.releaseDate !== modifiedMap.releaseDate
        || originalMap.game.name !== modifiedMap.game.name
        || originalMap.gameMode.name !== modifiedMap.gameMode.name
        || originalMap.mapType.name !== modifiedMap.mapType.name
        || originalMap.tier !== modifiedMap.tier
);

export const getCreatedAndDeletedAuthors = (originalMap: IEditMapState, modifiedMap: IEditMapState) => {
    const originalAuthorIds = originalMap.authors.map((author) => author.userId);
    const modifiedAuthorIds = modifiedMap.authors.map((author) => author.userId)
    const deletedAuthors = originalMap.authors.filter((x) => !modifiedAuthorIds.includes(x.userId));
    const createdAuthors = modifiedMap.authors.filter((x) => !originalAuthorIds.includes(x.userId));
    return {createdAuthors, deletedAuthors};
}

export const shouldUpdateDescription = (originalMap: IEditMapState, modifiedMap: IEditMapState): boolean => (
    originalMap.description !== modifiedMap.description
);

const shouldUpdateStage = (originalStage: IEditStage, modifiedStage: IEditStage): boolean => (
    originalStage.name !== modifiedStage.name
        || originalStage.number !== modifiedStage.number
        || originalStage.stageType !== modifiedStage.stageType
        || originalStage.authors !== modifiedStage.authors
);

export const getCreatedModifiedAndDeletedStages = (originalMap: IEditMapState, modifiedMap: IEditMapState) => {
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

export const getCreatedAndDeletedContributions = (originalMap: IEditMapState, modifiedMap: IEditMapState) => {
    const originalContributions = originalMap.contributors.reduce((conts: ITemporaryContribution[], contribution) => {
        const tempConts: ITemporaryContribution[] = contribution.contributionList.map((cont) => ({
            rowId: cont.rowId,
            userId: cont.user.userId,
            contribution: contribution.contribution,
        }))
        conts = [...conts, ...tempConts]
        return conts;
    }, []);
    const modifiedContributions = modifiedMap.contributors.reduce((conts: ITemporaryContribution[], contribution) => {
        const tempConts: ITemporaryContribution[] = contribution.contributionList.map((cont) => ({
            rowId: cont.rowId,
            userId: cont.user.userId,
            contribution: contribution.contribution,
        }))
        conts = [...conts, ...tempConts]
        return conts;
    }, []);
    const modifiedContributionIds = modifiedContributions.filter((cont) => !!cont.rowId).map((cont) => cont.rowId!);
    const createdContributions = modifiedContributions.filter((cont) => !cont.rowId);
    const deletedContributions = originalContributions.filter((cont) => !modifiedContributionIds.includes(cont.rowId!));
    return { createdContributions, deletedContributions };
};

type IEditImageWithType = IEditImage & {
    stageId?: string;
}

const getAllImages = (map: IEditMapState): IEditImageWithType[] => {
    const stageImages = map.stages.map((stage) => stage.images).flat().map((stage) => ({stageId: stage.rowId!, ...stage}));
    return [...map.mainImage, ...map.mapImages, ...stageImages];
};

interface IOptionWithFile {
    options: IImageOption;
    file: File;
}

// TODO - you can only upload images on existing stages
const getImagesWithTypeInfo = (map: IEditMapState) => {
    const stageImages: IOptionWithFile[] = map.stages.filter((stage) => !!stage.rowId && stage.images.length).map((stage) => ({
        file: stage.images[0].file!,
        options: {stageId: stage.rowId},
    }));
    const headerImages: IOptionWithFile[] = map.mainImage.filter((image) => !!image.file).map((image) => ({
        file: image.file!,
        options: {
            mapId: map.mapId,
            order: -1,
            primaryImage: true,
            backgroundImage: true,
        }
    }));
    const mapImages: IOptionWithFile[] = map.mapImages.filter((image) => !!image.file).map((image, index) => ({
        file: image.file!!,
        options: {
            mapId: map.mapId,
            order: index,
        }
    }));
    return [...stageImages, ...headerImages, ...mapImages];
}

export const getCreatedAndDeletedImages = (originalMap: IEditMapState, modifiedMap: IEditMapState) => {
    const allOriginalImages = getAllImages(originalMap);
    const originalRemainingImages = allOriginalImages.filter((image) => !!image.storeLocation);
    const allModifiedImages = getAllImages(modifiedMap);
    const modifiedRemainingImageLocations = allModifiedImages.filter((image) => !!image.storeLocation).map((image) => image.storeLocation!);

    const deletedImages = originalRemainingImages.filter((image) => !modifiedRemainingImageLocations.includes(image.storeLocation!));
    const createdImages = getImagesWithTypeInfo(modifiedMap);

    return { createdImages, deletedImages };
};
