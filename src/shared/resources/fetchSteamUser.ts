import { IUserSteamInfo } from 'shared/types';
import get from 'lodash/get';

export const fetchSteamUser = async (steamInfo: string): Promise<IUserSteamInfo> => {
    if(!steamInfo || steamInfo.length < 2) {
        return null!;
    }
    const response = await fetch(process.env.REACT_APP_AZURE_FUNCTION_DEV_URL + `/FetchSteamUser?steamInfo=${steamInfo}`, {
        method: 'GET',
        credentials: 'include', // TODO - same origin
    });
    if (response.ok) {
        const body = await response.json();
        return get(body, 'steamUser');
    }
    else {
        return null!;
    }
}
