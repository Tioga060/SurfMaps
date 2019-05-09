import { graphql } from 'react-relay';
import { simpleMutationCreator, batchEnvironment } from 'shared/resources/graphql';

// ============================================ Update Map ============================================
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

const updateMapQuery = graphql`
mutation UpdateMapGQL_mapMutation($map: UpdateMapByRowIdInput!) {
  updateMapByRowId(input: $map) {
    map {
      rowId
    }
  }
}
`
export const updateMap = simpleMutationCreator<IUpdateMapMutation>(batchEnvironment, updateMapQuery);

// ============================================ Delete Author ============================================
interface IDeleteAuthorMutation {
    author: {
        clientMutationId: string;
        authorId: string;
        mapId: string;
    }
}

const deleteAuthorQuery = graphql`
mutation UpdateMapGQL_deleteAuthorMutation($author: DeleteMapAuthorByAuthorIdAndMapIdInput!) {
  deleteMapAuthorByAuthorIdAndMapId(input: $author) {
    deletedMapAuthorId
  }
}
`
export const deleteAuthor = simpleMutationCreator<IDeleteAuthorMutation>(batchEnvironment, deleteAuthorQuery);

// ============================================ Delete Stage ============================================
interface IDeleteStageMutation {
    stage: {
        clientMutationId: string;
        rowId: string;
    }
}
const deleteStageQuery = graphql`
mutation UpdateMapGQL_deleteStageMutation($stage: DeleteStageByRowIdInput!) {
  deleteStageByRowId(input: $stage) {
    deletedStageId
  }
}
`
export const deleteStage = simpleMutationCreator<IDeleteStageMutation>(batchEnvironment, deleteStageQuery);

// ============================================ Update Stage ============================================
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

const updateStageQuery = graphql`
mutation UpdateMapGQL_stageMutation($stage: UpdateStageByRowIdInput!) {
  updateStageByRowId(input: $stage) {
    stage {
      rowId
    }
  }
}
`
export const updateStage = simpleMutationCreator<IUpdateStageMutation>(batchEnvironment, updateStageQuery);

// ============================================ Update Description ============================================
interface IUpdateDescriptionMutation {
    description: {
        clientMutationId: string;
        rowId: string;
        textMarkdownPatch: {
            text?: string;
        }
    }
}

const updateDescriptionQuery = graphql`
mutation UpdateMapGQL_descriptionMutation($description: UpdateTextMarkdownByRowIdInput!) {
  updateTextMarkdownByRowId(input: $description) {
    textMarkdown {
      rowId
    }
  }
}
`
export const updateDescription = simpleMutationCreator<IUpdateDescriptionMutation>(batchEnvironment, updateDescriptionQuery);

// ============================================ Update Contribution ============================================
interface IUpdateContributionMutation {
    contribution: {
        clientMutationId: string;
        rowId: string;
        mapContributorPatch: {
            contribution: string;
        }
    }
}

const updateContributionQuery = graphql`
mutation UpdateMapGQL_updateContributionMutation($contribution: UpdateMapContributorByRowIdInput!) {
  updateMapContributorByRowId(input: $contribution) {
    clientMutationId
  }
}
`
export const updateContribution = simpleMutationCreator<IUpdateContributionMutation>(batchEnvironment, updateContributionQuery);

// ============================================ Delete Contribution ============================================
interface IDeleteContributionMutation {
    contribution: {
        clientMutationId: string;
        rowId: string;
    }
}

const deleteContributionQuery = graphql`
mutation UpdateMapGQL_deleteContributionMutation($contribution: DeleteMapContributorByRowIdInput!) {
  deleteMapContributorByRowId(input: $contribution) {
    deletedMapContributorId
  }
}
`
export const deleteContribution = simpleMutationCreator<IDeleteContributionMutation>(batchEnvironment, deleteContributionQuery);

// ============================================ Delete MapImage ============================================
interface IDeleteMapImageMutation {
    image: {
        clientMutationId: string;
        imageId: string;
        mapId: string;
    }
}

const deleteMapImageQuery = graphql`
mutation UpdateMapGQL_deleteMapImageMutation($image: DeleteMapImageByMapIdAndImageIdInput!) {
  deleteMapImageByMapIdAndImageId(input: $image) {
    deletedMapImageId
  }
}
`
export const deleteMapImage = simpleMutationCreator<IDeleteMapImageMutation>(batchEnvironment, deleteMapImageQuery);

// ============================================ Delete StageImage ============================================
interface IDeleteStageImageMutation {
    image: {
        clientMutationId: string;
        imageId: string;
        stageId: string;
    }
}

const deleteStageImageQuery = graphql`
mutation UpdateMapGQL_deleteStageImageMutation($image: DeleteStageImageByStageIdAndImageIdInput!) {
  deleteStageImageByStageIdAndImageId(input: $image) {
    deletedStageImageId
  }
}
`
export const deleteStageImage = simpleMutationCreator<IDeleteStageImageMutation>(batchEnvironment, deleteStageImageQuery);
