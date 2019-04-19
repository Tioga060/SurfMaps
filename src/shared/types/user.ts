import { IUserSteamInfo } from './steamTypes';

export interface IUser {
    id: string;
    role: string;
    createdAt: string;
    name: string;
    userSteam?: IUserSteamInfo;
}
