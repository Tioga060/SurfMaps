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
