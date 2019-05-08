import { stringify } from 'query-string';

const REST_HOST = 'http://localhost:3040';

export interface IResponse {
    stage?: {
        imageId: string;
        stageId: string;
    }
    map?: {
        imageId: string;
        mapId: string;
        order: number;
        primaryImage: boolean;
        backgroundImage: boolean;
    }
    error?: string;
};

export interface IImageOption {
    mapId?: string;
    stageId?: string;
    order?: number;
    primaryImage?: boolean;
    backgroundImage?: boolean;
}

//TODO: filesize
export const uploadImage = (image: File, imageOptions: IImageOption, callBack: (response: IResponse) => void) => {
    console.log(image)
    const formData = new FormData();
    formData.append('image', image);
    const params = stringify(imageOptions);
    fetch(`${REST_HOST}/image/upload?${params}`, {
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
