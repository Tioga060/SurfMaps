import { IState as IEditMapState, IEditStage, IEditContribution } from '../components/EditMapDrawerContent/component';

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

export const getCreatedAndDeletedContributions = (originalMap: IEditMapState, modifiedMap: IEditMapState) => {
    const originalContributions = originalMap.contributors.reduce((conts: IEditContribution[], contribution) => {
        conts = [...conts, ...contribution.contributionList]
        return conts;
    }, []);
    const modifiedContributions = modifiedMap.contributors.reduce((conts: IEditContribution[], contribution) => {
        conts = [...conts, ...contribution.contributionList]
        return conts;
    }, []);
    const modifiedContributionIds = modifiedContributions.filter((cont) => !!cont.rowId).map((cont) => cont.rowId || '');
    const createdContributions = modifiedContributions.filter((cont) => !cont.rowId);
    const deletedContributions = originalContributions.filter((cont) => !modifiedContributionIds.includes(cont.rowId!));
    return { createdContributions, deletedContributions };
};
