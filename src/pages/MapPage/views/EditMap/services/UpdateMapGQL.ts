import { graphql } from 'react-relay';

export const updateMap = graphql`
mutation UpdateMapGQL_mapMutation($map: UpdateMapByRowIdInput!) {
  updateMapByRowId(input: $map) {
    map {
      rowId
    }
  }
}
`

export const deleteAuthor = graphql`
mutation UpdateMapGQL_deleteAuthorMutation($author: DeleteMapAuthorByAuthorIdAndMapIdInput!) {
  deleteMapAuthorByAuthorIdAndMapId(input: $author) {
    deletedMapAuthorId
  }
}
`

export const deleteStage = graphql`
mutation UpdateMapGQL_deleteStageMutation($stage: DeleteStageByRowIdInput!) {
  deleteStageByRowId(input: $stage) {
    deletedStageId
  }
}
`

export const updateStage = graphql`
mutation UpdateMapGQL_stageMutation($stage: UpdateStageByRowIdInput!) {
  updateStageByRowId(input: $stage) {
    stage {
      rowId
    }
  }
}
`

export const updateDescription = graphql`
mutation UpdateMapGQL_descriptionMutation($description: UpdateTextMarkdownByRowIdInput!) {
  updateTextMarkdownByRowId(input: $description) {
    textMarkdown {
      rowId
    }
  }
}
`

export const deleteContribution = graphql`
mutation UpdateMapGQL_deleteContributionMutation($contribution: DeleteMapContributorByRowIdInput!) {
  deleteMapContributorByRowId(input: $contribution) {
    deletedMapContributorId
  }
}
`

export const deleteMapImage = graphql`
mutation UpdateMapGQL_deleteMapImageMutation($image: DeleteMapImageByMapIdAndImageIdInput!) {
  deleteMapImageByMapIdAndImageId(input: $image) {
    deletedMapImageId
  }
}
`

export const deleteStageImage = graphql`
mutation UpdateMapGQL_deleteStageImageMutation($image: DeleteStageImageByStageIdAndImageIdInput!) {
  deleteStageImageByStageIdAndImageId(input: $image) {
    deletedStageImageId
  }
}
`
