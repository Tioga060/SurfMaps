import { graphql } from 'react-relay';


export const query = graphql`
query MapPageGQL_getMapByIdQuery($mapId: UUID!) {
    mapByRowId(rowId: $mapId) {
        rowId
        name
        public
        createdAt
        releasedAt
        gameModeByGameModeId {
            rowId
            name
        }
        gameByGameId {
            rowId
            name
        }
        tier
        mapTypeByMapTypeId {
            rowId
            name
        }
        mapAuthorsByMapId {
            nodes {
                contribution
                userByAuthorId {
                    rowId
                    role
                    createdAt
                    userSteamInfoByUserId {
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
        }
        userByUploaderId {
            rowId
            role
            createdAt
            userSteamInfoByUserId {
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
        mapImagesByMapId(orderBy: ORDER_ASC) {
            nodes {
                primaryImage
                backgroundImage
                order
                imageByImageId {
                    rowId
                    storeLocation
                    userByUploaderId {
                        rowId
                        role
                        createdAt
                        userSteamInfoByUserId {
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
            }
        }
        stagesByMapId {
            nodes {
                rowId
                name
                number
                stageTypeByStageTypeId {
                    rowId
                    name
                }
                userByAuthorId {
                    rowId
                    role
                    createdAt
                    userSteamInfoByUserId {
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
                stageImagesByStageId {
                    nodes {
                        imageByImageId {
                            rowId
                            storeLocation
                            userByUploaderId {
                                rowId
                                role
                                createdAt
                                userSteamInfoByUserId {
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
                    }
                }
            }
        }
        mapFilesByMapId {
            nodes {
                gameByGameId {
                    name
                }
                label
                isPrimary
                fileByFileId {
                    fileTypeByFileTypeId {
                        rowId
                        type
                    }
                    rowId
                    storeLocation
                    createdAt
                    active
                    userByUploaderId {
                        rowId
                        role
                        createdAt
                        userSteamInfoByUserId {
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
            }
        }
        mapDescriptionsByMapId {
            nodes {
                order
                textMarkdownByTextMarkdownId {
                    rowId
                    text
                    createdAt
                    updatedAt
                    userByAuthorId {
                        rowId
                        role
                        createdAt
                        userSteamInfoByUserId {
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
            }
        }
        mapContributorsByMapId {
            nodes {
                rowId
                contribution
                userByUserId {
                    rowId
                    role
                    createdAt
                    userSteamInfoByUserId {
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
        }
    }
}
`