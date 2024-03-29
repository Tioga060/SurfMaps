import { graphql } from 'react-relay';
import { mutationCreator, batchEnvironment } from 'shared/resources/graphql';

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
export const updateMap = mutationCreator<IUpdateMapMutation>(batchEnvironment, updateMapQuery);

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
export const deleteAuthor = mutationCreator<IDeleteAuthorMutation>(batchEnvironment, deleteAuthorQuery);

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
export const deleteStage = mutationCreator<IDeleteStageMutation>(batchEnvironment, deleteStageQuery);

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
export const updateStage = mutationCreator<IUpdateStageMutation>(batchEnvironment, updateStageQuery);

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
export const updateDescription = mutationCreator<IUpdateDescriptionMutation>(batchEnvironment, updateDescriptionQuery);

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
export const updateContribution = mutationCreator<IUpdateContributionMutation>(batchEnvironment, updateContributionQuery);

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
export const deleteContribution = mutationCreator<IDeleteContributionMutation>(batchEnvironment, deleteContributionQuery);

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
export const deleteMapImage = mutationCreator<IDeleteMapImageMutation>(batchEnvironment, deleteMapImageQuery);

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
export const deleteStageImage = mutationCreator<IDeleteStageImageMutation>(batchEnvironment, deleteStageImageQuery);

// ============================================ Update MapFile ============================================
interface IUpdateMapFileMutation {
  mapFile: {
      clientMutationId: string;
      mapId: string;
      fileId: string;
      mapFilePatch: {
          gameId?: string;
          label?: string;
          isPrimary?: string;
      }
  }
}

const updateMapFileQuery = graphql`
mutation UpdateMapGQL_updateMapFileMutation($mapFile: UpdateMapFileByMapIdAndFileIdInput!) {
updateMapFileByMapIdAndFileId(input: $mapFile) {
  clientMutationId
}
}
`
export const updateMapFile = mutationCreator<IUpdateMapFileMutation>(batchEnvironment, updateMapFileQuery);

// ============================================ Delete MapFile ============================================
interface IDeleteMapFileMutation {
    mapFile: {
        clientMutationId: string;
        mapId: string;
        fileId: string;
    }
}

const deleteMapFileQuery = graphql`
mutation UpdateMapGQL_deleteMapFileMutation($mapFile: DeleteMapFileByMapIdAndFileIdInput!) {
deleteMapFileByMapIdAndFileId(input: $mapFile) {
  deletedMapFileId
}
}
`
export const deleteMapFile = mutationCreator<IDeleteMapFileMutation>(batchEnvironment, deleteMapFileQuery);

// ============================================ Update Image ============================================
interface IUpdateImageMutation {
  image: {
      clientMutationId: string;
      rowId: string;
      imagePatch: {
          isOrphan?: boolean;
      }
  }
}

const updateImageQuery = graphql`
mutation UpdateMapGQL_updateImageMutation($image: UpdateImageByRowIdInput!) {
  updateImageByRowId(input: $image) {
    clientMutationId
  }
}
`
export const updateImage = mutationCreator<IUpdateImageMutation>(batchEnvironment, updateImageQuery);

// ============================================ Update File ============================================
interface IUpdateFileMutation {
  file: {
      clientMutationId: string;
      rowId: string;
      filePatch: {
          isOrphan?: boolean;
          fileTypeId?: string;
      }
  }
}

const updateFileQuery = graphql`
mutation UpdateMapGQL_updateFileMutation($file: UpdateFileByRowIdInput!) {
  updateFileByRowId(input: $file) {
    clientMutationId
  }
}
`
export const updateFile = mutationCreator<IUpdateFileMutation>(batchEnvironment, updateFileQuery);
