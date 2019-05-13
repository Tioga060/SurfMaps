import { graphql } from 'react-relay';
import { simpleMutationCreator, callbackMutationCreator, batchEnvironment, environment } from 'shared/resources/graphql';

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
export const createMap = callbackMutationCreator<ICreateMapMutation, ICreateMapResponse>(environment, createMapQuery);

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
export const createAuthor = simpleMutationCreator<ICreateAuthorMutation>(batchEnvironment, createAuthorQuery);

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
export const createStage = simpleMutationCreator<ICreateStageMutation>(batchEnvironment, createStageQuery);


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
export const createDescription = callbackMutationCreator<ICreateDescriptionMutation, ICreateDescriptionResponse>(environment, createDescriptionQuery);

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
export const createMapDescription = simpleMutationCreator<ICreateMapDescriptionMutation>(batchEnvironment, createMapDescriptionQuery);

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
export const createContribution = simpleMutationCreator<ICreateMapContributionMutation>(batchEnvironment, createContributionQuery); 

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
export const createImage = callbackMutationCreator<ICreateImageMutation, ICreateImageResponse>(environment, createImageQuery); 

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
export const createMapImage = simpleMutationCreator<ICreateMapImageMutation>(batchEnvironment, createMapImageQuery);

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
export const createStageImage = simpleMutationCreator<ICreateStageImageMutation>(batchEnvironment, createStageImageQuery);
