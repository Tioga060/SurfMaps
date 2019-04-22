export interface IUserSteamInfoAsNodes {
    nodes: IUserSteamInfo[];
}

export interface IUserSteamInfo {
    name: string,
    profileUrl: string,
    timeCreated: number,
    avatar: string,
    avatarMedium: string,
    avatarFull: string,
    numericSteamId: string,
}
