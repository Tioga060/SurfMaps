import { graphql } from 'react-relay';

export const query = graphql`
query UserListGQL_searchUsersQuery($search: String) {
    searchSteamUsers(search: $search) {
        nodes {
            userId
            name
            profileUrl
            timeCreated
            avatar
            avatarMedium
            avatarFull
            numericSteamId
        }
    }
}
`