import * as T from 'shared/types';
import { IEditImage } from 'shared/components/ImageDropzone';

export interface IDisplayContribution {
    user: T.IUserSteamInfo;
    rowId?: string;
}

export interface IDisplayContributionGroup {
    contribution: string;
    contributionList: IDisplayContribution[];
}

export interface IDisplayStage {
    rowId?: string;
    name: string;
    number: number;
    authors: T.IUserSteamInfo[];
    stageType: T.IStageType;
    images: IEditImage[];
}

export interface IDisplayMapFile {
    files: File[];
    game: T.IGame;
    description: string;
}

export interface IDisplayDescription {
    text: string;
    rowId?: string;
}

export interface IDisplayMap {
    submitter: T.IUserSteamInfo;
    mapName: string;
    authors: T.IUserSteamInfo[];
    tier: number;
    gameMode: T.IGameMode;
    game: T.IGame;
    mapType: T.IMapType;
    description: IDisplayDescription;
    contributors: IDisplayContributionGroup[];
    stages: IDisplayStage[];
    mainImage: IEditImage[];
    mapImages: IEditImage[];
    releaseDate: string;
    mapFiles: IDisplayMapFile[];
    mapId?: string;
}