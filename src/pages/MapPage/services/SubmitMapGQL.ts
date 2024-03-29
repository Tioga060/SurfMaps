import { graphql } from 'react-relay';
import { mutationCreator, batchEnvironment, environment } from 'shared/resources/graphql';

// ============================================ Create Map ============================================
export interface ICreateMapMutation {
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

export interface ICreateMapResponse {
  createMap: {
      map: {
          rowId: string;
      }
  }
}

const createMapQuery = graphql`
mutation SubmitMapGQL_mapMutation($map: CreateMapInput!) {
  createMap(input: $map) {
    map {
      rowId
    }
  }
}
`
export const createMap = mutationCreator<ICreateMapMutation, ICreateMapResponse>(environment, createMapQuery);

// ============================================ Create Author ============================================
interface ICreateAuthorMutation {
  author: {
      clientMutationId: string;
      mapAuthor: {
          authorId: string;
          mapId: string;
      }
  }
}
const createAuthorQuery = graphql`
mutation SubmitMapGQL_authorMutation($author: CreateMapAuthorInput!) {
  createMapAuthor(input: $author) {
    mapAuthor {
      authorId,
      mapId
    }
  }
}
`
export const createAuthor = mutationCreator<ICreateAuthorMutation>(batchEnvironment, createAuthorQuery);

// ============================================ Create Stage ============================================
export interface ICreateStageMutation {
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
const createStageQuery = graphql`
mutation SubmitMapGQL_stageMutation($stage: CreateStageInput!) {
  createStage(input: $stage) {
    stage {
      rowId
    }
  }
}
`
export const createStage = mutationCreator<ICreateStageMutation>(batchEnvironment, createStageQuery);


// ============================================ Create Description ============================================
interface ICreateDescriptionMutation {
  description: {
      clientMutationId: string;
      textMarkdown: {
          text: string;
          authorId: string;
      }
  }
}
export interface ICreateDescriptionResponse {
  createTextMarkdown: {
      textMarkdown: {
          rowId: string;
      }
  }
}

const createDescriptionQuery = graphql`
mutation SubmitMapGQL_descriptionMutation($description: CreateTextMarkdownInput!) {
  createTextMarkdown(input: $description) {
    textMarkdown {
      rowId
    }
  }
}
`
export const createDescription = mutationCreator<ICreateDescriptionMutation, ICreateDescriptionResponse>(environment, createDescriptionQuery);

// ============================================ Create MapDescription ============================================
interface ICreateMapDescriptionMutation {
  description: {
      clientMutationId: string;
      mapDescription: {
          mapId: string;
          textMarkdownId: string;
          order: number;
      }
  }
}
const createMapDescriptionQuery = graphql`
mutation SubmitMapGQL_mapDescriptionMutation($description: CreateMapDescriptionInput!) {
  createMapDescription(input: $description) {
    mapDescription {
      mapId,
      textMarkdownId,
    }
  }
}
`
export const createMapDescription = mutationCreator<ICreateMapDescriptionMutation>(batchEnvironment, createMapDescriptionQuery);

// ============================================ Create Contribution ============================================
interface ICreateMapContributionMutation {
  contribution: {
      clientMutationId: string;
      mapContributor: {
          mapId: string;
          userId: string;
          contribution: string;
      }
  }
}
const createContributionQuery = graphql`
mutation SubmitMapGQL_mapContributionMutation($contribution: CreateMapContributorInput!) {
  createMapContributor(input: $contribution) {
    mapContributor {
      mapId,
      userId,
      contribution,
    }
  }
}
`
export const createContribution = mutationCreator<ICreateMapContributionMutation>(batchEnvironment, createContributionQuery); 

// ============================================ Create Image ============================================
interface ICreateImageMutation {
  image: {
      clientMutationId: string;
      image: {
          storeLocation: string;
          uploaderId: string;
      }
  }
}
export interface ICreateImageResponse {
  createImage: {
      image: {
          rowId: string;
      }
  }
}
const createImageQuery = graphql`
mutation SubmitMapGQL_ImageMutation($image: CreateImageInput!) {
  createImage(input: $image) {
    image {
      rowId,
    }
  }
}
`
export const createImage = mutationCreator<ICreateImageMutation, ICreateImageResponse>(environment, createImageQuery); 

// ============================================ Create MapImage ============================================
interface ICreateMapImageMutation {
  image: {
      clientMutationId: string;
      mapImage: {
          mapId: string;
          imageId: string;
          backgroundImage: boolean;
          primaryImage: boolean;
          order: number;
      }
  }
}
const createMapImageQuery = graphql`
mutation SubmitMapGQL_mapImageMutation($image: CreateMapImageInput!) {
  createMapImage(input: $image) {
    clientMutationId
  }
}
`
export const createMapImage = mutationCreator<ICreateMapImageMutation>(batchEnvironment, createMapImageQuery);

// ============================================ Create StageImage ============================================
interface ICreateStageImageMutation {
  image: {
      clientMutationId: string;
      stageImage: {
          stageId: string;
          imageId: string;
      }
  }
}
const createStageImageQuery = graphql`
mutation SubmitMapGQL_stageImageMutation($image: CreateStageImageInput!) {
  createStageImage(input: $image) {
    clientMutationId
  }
}
`
export const createStageImage = mutationCreator<ICreateStageImageMutation>(batchEnvironment, createStageImageQuery);

// ============================================ Create File ============================================
interface ICreateFileMutation {
  file: {
      clientMutationId: string;
      file: {
          storeLocation: string;
          uploaderId: string;
          fileTypeId: string;
      }
  }
}
export interface ICreateFileResponse {
  createFile: {
      file: {
          rowId: string;
      }
  }
}
const createFileQuery = graphql`
mutation SubmitMapGQL_FileMutation($file: CreateFileInput!) {
  createFile(input: $file) {
    file {
      rowId,
    }
  }
}
`
export const createFile = mutationCreator<ICreateFileMutation, ICreateFileResponse>(environment, createFileQuery); 

// ============================================ Create MapFile ============================================
interface ICreateMapFileMutation {
  file: {
      clientMutationId: string;
      mapFile: {
          mapId: string;
          fileId: string;
          gameId: string;
          label: string;
          isPrimary: boolean;
      }
  }
}
const createMapFileQuery = graphql`
mutation SubmitMapGQL_mapFileMutation($file: CreateMapFileInput!) {
  createMapFile(input: $file) {
    clientMutationId
  }
}
`
export const createMapFile = mutationCreator<ICreateMapFileMutation>(batchEnvironment, createMapFileQuery);
