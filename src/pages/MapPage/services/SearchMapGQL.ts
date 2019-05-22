import { graphql } from 'react-relay';
import { queryCreator, environment } from 'shared/resources/graphql';

interface ISearchMapParams {
    text: string;
}

interface ISearchMapsResponse {
    searchMapsByName: {
        nodes: { rowId: string; }[];
    }
};

const searchMapsQuery = graphql`
query SearchMapGQL_searchMapQuery($text: String) {
  searchMapsByName(search: $text) {
    nodes {
      rowId
    }
  }
}
`

export const searchMapsByName = queryCreator<ISearchMapParams, ISearchMapsResponse>(environment, searchMapsQuery);

interface ICanEditMapParams {
  mapid: string;
}

interface ICanEditMapResponse {
  canUpdateMap: boolean;
}

const canEditMapQuery = graphql`
query SearchMapGQL_canEditQuery($mapid: UUID!) {
  canUpdateMap(mapid: $mapid)
}
`

export const canEditMap = queryCreator<ICanEditMapParams, ICanEditMapResponse>(environment, canEditMapQuery);
