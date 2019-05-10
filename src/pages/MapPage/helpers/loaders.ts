import * as T from 'shared/types';
import * as MapTypes from '../types';

const createContextPlaceholder = () => ({
    name: '',
    rowId: '',
});

export const getDefaultDisplayMap = (submitter: T.IUserSteamInfo): MapTypes.IDisplayMap => ({
    submitter,
    mapName: '',
    authors: [],
    tier: 3,
    gameMode: createContextPlaceholder(),
    game: createContextPlaceholder(),
    mapType: createContextPlaceholder(),
    description: {text: ''},
    contributors: [],
    stages: [],
    mainImage: [],
    mapImages: [],
    releaseDate: '',
    mapFiles: [],
    mapId: '',
});