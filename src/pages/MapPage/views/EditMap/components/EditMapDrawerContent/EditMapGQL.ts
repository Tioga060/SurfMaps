import { graphql } from 'react-relay';

export const query = graphql`
query EditMapGQL_contextQuery {
    allMapTypes {
        nodes {
            rowId,
            name,
        }
    }
    allGameModes {
        nodes {
            rowId,
            name,
        }
    }
    allGames  {
        nodes {
            rowId,
            name,
        }
    }
    allStageTypes {
        nodes {
            rowId,
            name
        }
    }
    currentUserSteamInfo {
        name,
        profileUrl,
        timeCreated,
        avatar,
        avatarMedium,
        avatarFull,
        numericSteamId,
        userId
    }
}
`
