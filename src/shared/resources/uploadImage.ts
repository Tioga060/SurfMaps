import get from 'lodash/get';

const REST_HOST = 'http://localhost:3040';

interface IResponse {
    imageId: string;
}

export const uploadImage = (image: File, callBack: (imageId: string | null) => void) => {
    fetch(`${REST_HOST}/image/upload`, {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'multipart/form-data'},
        body: image,
    }).then(response => {
        if(response.ok) {
            response.json().then((value: IResponse) => {
                callBack(get(value, 'imageId', null));
            })
        } else {
            callBack(null);
        }
    });
};

