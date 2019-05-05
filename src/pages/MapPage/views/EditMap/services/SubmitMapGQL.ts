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
