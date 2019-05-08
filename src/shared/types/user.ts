import { IUserSteamInfo} from './steamTypes';

export interface IUserAsNodes {
    nodes: IUser[];
}

export interface IUser {
    rowId: string;
    role?: string;
    createdAt?: string;
    userSteamInfoByUserId: IUserSteamInfo;
}
