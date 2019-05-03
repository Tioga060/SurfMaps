export interface IUserSteamInfoAsNodes {
    nodes: IUserSteamInfo[];
}

export interface IUserSteamInfo {
    userId: string,
    name: string,
    profileUrl: string,
    timeCreated: number,
    avatar: string,
    avatarMedium: string,
    avatarFull: string,
    numericSteamId: string,
}
