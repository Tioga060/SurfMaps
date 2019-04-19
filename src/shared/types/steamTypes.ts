import { IUser } from './user';

export interface IUserSteamInfo {
    name: string,
    profileUrl: string,
    timeCreated: number,
    avatar: string,
    avatarMedium: string,
    avatarFull: string,
    numericSteamId: string,
    user?: IUser;
}
