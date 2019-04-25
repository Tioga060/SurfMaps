import { IUserSteamInfo } from 'shared/types';
import get from 'lodash/get';

const REST_HOST = 'http://localhost:3040';

interface IResponse {
    steamUser: IUserSteamInfo | null;
}

export const fetchSteamUser = (steamId64: string, callBack: (user: IUserSteamInfo | null) => void) => {
    if(!steamId64 || steamId64.length < 2) {
        callBack(null);
        return;
    }
    fetch(REST_HOST + `/steam/steaminfo?steamid=${steamId64}`, {
        method: 'GET',
        credentials: 'include',
        //mode: 'no-cors', // TODO - remove me
    }).then(response => {
        if(response.ok) {
            response.json().then((value: IResponse) => {
                callBack(get(value, 'steamUser', null));
            })
        } else {
            callBack(null);
        }
    });
}
