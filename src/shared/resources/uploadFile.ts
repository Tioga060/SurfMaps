import { stringify } from 'query-string';

const REST_HOST = 'http://localhost:3040';

export interface IResponse {
    mapFile?: {
        fileId: string;
        mapId: string;
        gameId: string;
        label: string;
        isPrimary: boolean;
    }
    error?: string;
};

export interface IFileOption {
    mapId: string;
    gameId: string;
    fileTypeId: string;
    isPrimary: boolean;
    label: string;
}

//TODO: filesize
export const uploadFile = (image: File, fileOptions: IFileOption, callBack: (response: IResponse) => void) => {
    const formData = new FormData();
    formData.append('file', image);
    const params = stringify(fileOptions);
    fetch(`${REST_HOST}/file/upload?${params}`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
    }).then(response => {
        if(response.ok) {
            response.json().then((response: IResponse) => {
                callBack(response);
            })
        } else {
            callBack({error: 'Error'});
        }
    }).catch(error => callBack({error: error.message}));
};
