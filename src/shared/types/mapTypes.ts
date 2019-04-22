import { IUser } from './user';
import { IImage } from './image';
import { IFile } from './file';
import { ITextMarkdown } from './text';
import { IGame, IGameMode, IMapType, IStageType} from './descriptors';

export interface IMap {
    rowId: string;
    name: string;
    public?: boolean;
    createdAt: string;
    gameModeByGameModeId: IGameMode;
    gameByGameId: IGame;
    mapTypeByMapTypeId: IMapType;
    tier?: number;
    mapAuthorsByMapId: IMapAuthorAsNodes;
    userByUploaderId: IUser;
    stagesByMapId: IStageAsNodes;
    mapImagesByMapId: IMapImageAsNodes;
    mapFilesByMapId: IMapFileAsNodes;
    mapDescriptionsByMapId: IMapDescrtionAsNodes;
    mapContributorsByMapId: IMapContributorAsNodes;
}

export interface IMapAuthorAsNodes {
    nodes: IMapAuthor[];
}

export interface IMapAuthor {
    contribution: string;
    userByAuthorId: IUser;
}

export interface IStageAsNodes {
    nodes: IStage[];
}

export interface IStage {
    rowId: string;
    name?: string;
    number: number;
    stageTypeByStageTypeId: IStageType;
    userByAuthorId: IUser;
    stageImagesByStageId: IStageImageAsNodes;
}

export interface IStageImageAsNodes {
    nodes: IStageImage[];
}

export interface IStageImage {
    imageByImageId: IImage;
}

export interface IMapImageAsNodes {
    nodes: IMapImage[];
}

export interface IMapImage {
    backgroundImage?: boolean;
    primaryImage?: boolean;
    order: number;
    imageByImageId: IImage;
}

export interface IMapFileAsNodes {
    nodes: IMapFile[];
}

export interface IMapFileAsNodes {
    nodes: IMapFile[];
}

export interface IMapFile {
    gameByGameId: IGame;
    label: string;
    isPrimary?: boolean;
    fileByFileId: IFile;
}

export interface IMapDescrtionAsNodes {
    nodes: IMapDescription[];
}

export interface IMapDescription {
    order: number;
    textMarkdownByTextMarkdownId: ITextMarkdown;
}

export interface IMapContributorAsNodes {
    nodes: IMapContributor[];
}

export interface IMapContributor {
    contribution: string;
    userByUserId: IUser;
}
