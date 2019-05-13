import { uploadFile, generateSas } from 'shared/resources/azure';
import * as SubmitHelpers from './gqlSubmitHelpers';
import { ICreateImageResponse } from './SubmitMapGQL';
import { TransferProgressEvent } from '@azure/ms-rest-js';

const FILE_NAME_LENGTH = -50;

export interface IImageOption {
    stageId?: string
    order?: number;
    primaryImage?: boolean;
    backgroundImage?: boolean;
}

const tempProgressCallback = (ev: TransferProgressEvent) => console.log(ev); // TODO

export const uploadImage = async (mapId: string, uploaderId: string, file: File, options: IImageOption, cb: () => void) => {
    if (options.stageId) {
        SubmitHelpers.createImage(uploaderId, async (response: ICreateImageResponse) => {
            SubmitHelpers.createStageImage(options.stageId!, uploaderId, response, cb);

            const fileName = encodeURI(file.name.substr(FILE_NAME_LENGTH));
            const imageId = response.createImage.image.rowId;
            const blobName = `${options.stageId}/${imageId}/${fileName}`;
            const { token, uri } = await generateSas(mapId); // TODO: do not request token on every upload, reuse them instead
            console.log(uri);
            uploadFile(file, token, mapId, blobName, tempProgressCallback);
        });
    } else {
        SubmitHelpers.createImage(uploaderId, async (response: ICreateImageResponse) => {
            SubmitHelpers.createMapImage(mapId, uploaderId, response, options.order!, cb, options.backgroundImage, options.primaryImage);

            const fileName = encodeURI(file.name.substr(FILE_NAME_LENGTH));
            const imageId = response.createImage.image.rowId;
            const blobName = `${options.stageId}/${imageId}/${fileName}`;
            const { token } = await generateSas(mapId);
            uploadFile(file, token, mapId, blobName, tempProgressCallback);
        });
    }
};
