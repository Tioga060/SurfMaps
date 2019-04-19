import { IMap, IStage, IImage, IMapImage } from '../../../shared/types';

const mockUser = {
    id: '321',
    role: 'superuser',
    createdAt: '2018-01-08 04:05:06 -8:00',
    name: 'Tioga060',
    userSteam: {
        name: 'Tioga060',
        profileUrl: 'https://steamcommunity.com/id/tioga060/',
        timeCreated: 1204086519,
        avatar: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/16/16490a67804954212fa98fb5b7f822d6b0e52acb.jpg',
        avatarMedium: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/16/16490a67804954212fa98fb5b7f822d6b0e52acb_medium.jpg',
        avatarFull: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/16/16490a67804954212fa98fb5b7f822d6b0e52acb_full.jpg',
        numericSteamId: '76561197996909346',
    }
};

const createMockImage = (url: string): IImage => ({
    storeLocation: url,
    uploader: mockUser,
    uploadedAt: '2019-01-08 04:05:06 -8:00',
})


const mapImages: IMapImage[] = [
    {
        backgroundImage: true,
        primaryImage: true,
        image: createMockImage(`${process.env.PUBLIC_URL}/dev/${'surf_obliteration'}.jpg`),
        order: 0,
    },
    {
        image: createMockImage(`${process.env.PUBLIC_URL}/dev/${'surf_extremex'}.jpg`),
        order: 1,
    },
    {
        image: createMockImage(`${process.env.PUBLIC_URL}/dev/${'surf_apollonian'}.jpg`),
        order: 2,
    },
    {
        image: createMockImage(`${process.env.PUBLIC_URL}/dev/${'surf_fast'}.jpg`),
        order: 3,
    },
    {
        image: createMockImage(`${process.env.PUBLIC_URL}/dev/${'surf_fortum'}.jpg`),
        order: 4,
    },
    {
        image: createMockImage(`${process.env.PUBLIC_URL}/dev/${'surf_summer'}.jpg`),
        order: 5,
    },
    {
        image: createMockImage(`${process.env.PUBLIC_URL}/dev/${'surf_timewarp'}.jpg`),
        order: 6,
    },
    {
        image: createMockImage(`${process.env.PUBLIC_URL}/dev/${'surf_treefort'}.jpg`),
        order: 7,
    },
]

const stages: IStage[] = [
    {
        id: '111',
        number: 1,
        stageType: 'Stage',
        author: mockUser,
        images: [mapImages[3].image],
    },
    {
        id: '222',
        number: 2,
        stageType: 'Stage',
        author: mockUser,
        images: [mapImages[4].image],
    },
    {
        id: '333',
        number: 3,
        stageType: 'Stage',
        author: mockUser,
        images: [mapImages[5].image],
    },
    {
        id: '444',
        number: 4,
        stageType: 'Stage',
        author: mockUser,
        images: [mapImages[6].image],
    },
    {
        id: '555',
        number: 1,
        stageType: 'Bonus',
        author: mockUser,
        images: [mapImages[7].image],
    },
]

export const mockMap: IMap = {
    id: '123',
    name: 'surf_obliteration',
    public: true,
    createdAt: '2019-01-08 04:05:06 -8:00',
    gameMode: 'Surf',
    game: 'Counter-Strike: Source',
    mapType: 'Staged',
    author: [mockUser],
    uploader: mockUser,
    images: mapImages.slice(0,3),
    stages,
}
