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
                    userSteamInfosByUserId {
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
            }
        }
        userByUploaderId {
            rowId
            role
            createdAt
            userSteamInfosByUserId {
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
        mapImagesByMapId {
            nodes {
                primaryImage
                backgroundImage
                order
                imageByImageId {
                    storeLocation
                    userByUploaderId {
                        rowId
                        role
                        createdAt
                        userSteamInfosByUserId {
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
                    userSteamInfosByUserId {
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
                stageImagesByStageId {
                    nodes {
                        imageByImageId {
                            storeLocation
                            userByUploaderId {
                                rowId
                                role
                                createdAt
                                userSteamInfosByUserId {
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
                        userSteamInfosByUserId {
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
                        userSteamInfosByUserId {
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
                    userSteamInfosByUserId {
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
            }
        }
    }
}
`