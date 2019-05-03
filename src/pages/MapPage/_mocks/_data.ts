import { IMap, IUser, IStage, IImage, IMapImage, IMapFile, IMapDescription, IMapContributor, IMapAuthor } from 'shared/types';

const mockUser: IUser = {
    rowId: '321',
    role: 'superuser',
    createdAt: '2018-01-08 04:05:06 -8:00',
    userSteamInfosByUserId: {
        nodes: [{
            name: 'Tioga060',
            profileUrl: 'https://steamcommunity.com/id/tioga060/',
            timeCreated: 1204086519,
            avatar: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/16/16490a67804954212fa98fb5b7f822d6b0e52acb.jpg',
            avatarMedium: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/16/16490a67804954212fa98fb5b7f822d6b0e52acb_medium.jpg',
            avatarFull: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/16/16490a67804954212fa98fb5b7f822d6b0e52acb_full.jpg',
            numericSteamId: '76561197996909346',
            userId: '321',
        }]
    }
};

const createMockImage = (url: string): IImage => ({
    storeLocation: url,
    userByUploaderId: mockUser,
    uploadedAt: '2019-01-08 04:05:06 -8:00',
})


const mapImages: IMapImage[] = [
    {
        backgroundImage: true,
        primaryImage: true,
        imageByImageId: createMockImage(`${process.env.PUBLIC_URL}/dev/surf_obliteration.jpg`),
        order: 0,
    },
    {
        imageByImageId: createMockImage(`${process.env.PUBLIC_URL}/dev/surf_extremex.jpg`),
        order: 1,
    },
    {
        imageByImageId: createMockImage(`${process.env.PUBLIC_URL}/dev/surf_apollonian.jpg`),
        order: 2,
    },
    {
        imageByImageId: createMockImage(`${process.env.PUBLIC_URL}/dev/surf_fast.jpg`),
        order: 3,
    },
    {
        imageByImageId: createMockImage(`${process.env.PUBLIC_URL}/dev/surf_fortum.jpg`),
        order: 4,
    },
    {
        imageByImageId: createMockImage(`${process.env.PUBLIC_URL}/dev/surf_summer.jpg`),
        order: 5,
    },
    {
        imageByImageId: createMockImage(`${process.env.PUBLIC_URL}/dev/surf_timewarp.jpg`),
        order: 6,
    },
    {
        imageByImageId: createMockImage(`${process.env.PUBLIC_URL}/dev/surf_treefort.jpg`),
        order: 7,
    },
]

const stages: IStage[] = [
    {
        rowId: '111',
        number: 1,
        stageTypeByStageTypeId: {name: 'Stage'},
        userByAuthorId: mockUser,
        stageImagesByStageId: {nodes: [mapImages[3]]},
    },
    {
        rowId: '222',
        number: 2,
        stageTypeByStageTypeId: {name: 'Stage'},
        userByAuthorId: mockUser,
        stageImagesByStageId: {nodes: [mapImages[4]]},
    },
    {
        rowId: '333',
        number: 3,
        stageTypeByStageTypeId: {name: 'Stage'},
        userByAuthorId: mockUser,
        stageImagesByStageId: {nodes: [mapImages[5]]},
    },
    {
        rowId: '444',
        number: 4,
        stageTypeByStageTypeId: {name: 'Stage'},
        userByAuthorId: mockUser,
        stageImagesByStageId: {nodes: [mapImages[6]]},
    },
    {
        rowId: '555',
        number: 1,
        stageTypeByStageTypeId: {name: 'Bonus'},
        userByAuthorId: mockUser,
        stageImagesByStageId: {nodes: [mapImages[7]]},
    },
];

const mapFiles: IMapFile[] = [
    {
        gameByGameId: {name: 'Counter-Strike: Source'},
        label: 'Official Release',
        fileByFileId: {
            rowId: '123',
            storeLocation: 'A place',
            userByUploaderId: mockUser,
            createdAt: '2019-01-08 04:05:06 -8:00',
            active: true,
            fileTypeByFileTypeId: {type: 'bsp'},
        }
    }, {
        gameByGameId: {name: 'Counter-Strike: Global Offensive'},
        label: 'Unofficial Port',
        fileByFileId: {
            rowId: '321',
            storeLocation: 'A place 2',
            userByUploaderId: mockUser,
            createdAt: '2019-02-10 04:05:06 -8:00',
            active: true,
            fileTypeByFileTypeId: {type: 'bsp'},
        }
    }
];

const description: IMapDescription = {
    order: 0,
    textMarkdownByTextMarkdownId: {
        rowId: '123',
        createdAt: '2019-01-08 04:05:06 -8:00',
        updatedAt: '2019-01-08 04:05:06 -8:00',
        userByAuthorId: mockUser,
        text: '# Surf_Obliteration\nThis map is freaking amazing!! I made it in just 20 hours and you won\'t believe how fun it is, just ask Obregon',
    }
}

const mockContribution: IMapContributor = {
    contribution: 'Tester',
    userByUserId: mockUser,
};

const mockSupportContribution: IMapContributor = {
    contribution: 'Support',
    userByUserId: mockUser,
};

const mockMapAuthor: IMapAuthor = {
    contribution: 'Lead Designer',
    userByAuthorId: mockUser,
}

export const mockMap: IMap = {
    rowId: '123',
    name: 'surf_obliteration',
    public: true,
    createdAt: '2019-01-08 04:05:06 -8:00',
    gameModeByGameModeId: {name: 'Surf'},
    gameByGameId: {name: 'Counter-Strike: Source'},
    tier: 6,
    mapTypeByMapTypeId: {name: 'Staged'},
    mapAuthorsByMapId: {nodes: [mockMapAuthor]},
    userByUploaderId: mockUser,
    mapImagesByMapId: {nodes: mapImages.slice(0,3)},
    stagesByMapId: {nodes: stages},
    mapFilesByMapId: {nodes: mapFiles},
    mapDescriptionsByMapId: {nodes: [description]},
    mapContributorsByMapId: {nodes: [mockContribution, mockContribution, mockSupportContribution, mockSupportContribution]},
}
