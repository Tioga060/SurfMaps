import { graphql } from 'react-relay';

export const validMapNameQuery = graphql`
query ValidatorGQL_mapNameQuery($condition: MapCondition!) {
    allMaps(condition: $condition) {
        nodes {
            name
        }
    }
}
`
