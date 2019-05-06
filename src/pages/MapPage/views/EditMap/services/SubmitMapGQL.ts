import { graphql } from 'react-relay';

export const submitMap = graphql`
mutation SubmitMapGQL_mapMutation($map: CreateMapInput!) {
  createMap(input: $map) {
    map {
      rowId
    }
  }
}
`

export const submitAuthor = graphql`
mutation SubmitMapGQL_authorMutation($author: CreateMapAuthorInput!) {
  createMapAuthor(input: $author) {
    mapAuthor {
      authorId,
      mapId
    }
  }
}
`

export const submitStage = graphql`
mutation SubmitMapGQL_stageMutation($stage: CreateStageInput!) {
  createStage(input: $stage) {
    stage {
      rowId
    }
  }
}
`

export const submitDescription = graphql`
mutation SubmitMapGQL_descriptionMutation($description: CreateTextMarkdownInput!) {
  createTextMarkdown(input: $description) {
    textMarkdown {
      rowId
    }
  }
}
`

export const submitMapDescription = graphql`
mutation SubmitMapGQL_mapDescriptionMutation($description: CreateMapDescriptionInput!) {
  createMapDescription(input: $description) {
    mapDescription {
      mapId,
      textMarkdownId,
    }
  }
}
`

export const submitContribution = graphql`
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
