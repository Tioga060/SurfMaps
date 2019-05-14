import * as T from 'shared/types';
import * as MapTypes from '../types';
import { IEditImage } from 'shared/components/ImageDropzone';

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

export const hasImage = (image: IEditImage) => (!!image.file || !!image.rowId || !!image.storeLocation);
