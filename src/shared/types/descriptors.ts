export interface IGameAsNodes {
    nodes: IGame[]
}

export interface IGame {
    rowId?: string;
    name: string;
}

export interface IGameModeAsNodes {
    nodes: IGameMode[]
}

export interface IGameMode {
    rowId?: string;
    name: string;
}

export interface IMapTypeAsNodes {
    nodes: IMapType[]
}

export interface IMapType {
    rowId?: string;
    name: string;
}

export interface IFileTypeAsNodes {
    nodes: IFileType[]
}

export interface IFileType {
    rowId?: string;
    name: string;
}

export interface IStageTypeAsNodes {
    nodes: IStageType[]
}

export interface IStageType {
    rowId?: string;
    name: string;
}
