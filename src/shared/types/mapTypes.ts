import { IUser } from './user';
import { IImage } from './image';

export interface IMap {
    id: string;
    name: string;
    public?: boolean;
    createdAt: string;
    gameMode: string;
    game: string;
    mapType: string;
    tier?: number;
    authors?: IUser[];
    uploader: IUser;
    stages?: IStage[];
    images?: IMapImage[];
}

export interface IStage {
    id: string;
    name?: string;
    number: number;
    stageType: string;
    author?: IUser;
    images?: IImage[];
}

export interface IMapImage {
    backgroundImage?: boolean;
    primaryImage?: boolean;
    order: number;
    image: IImage;
}
