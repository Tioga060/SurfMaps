import { uploadFile, generateSas } from 'shared/resources/azure';
import * as SubmitHelpers from './gqlSubmitHelpers';
import { ICreateImageResponse } from './SubmitMapGQL';
import { TransferProgressEvent } from '@azure/ms-rest-js';
import { IOptionWithFile } from '../helpers';
const FILE_NAME_LENGTH = -50;

export interface IImageOption {
    stageId?: string
    order?: number;
    primaryImage?: boolean;
    backgroundImage?: boolean;
}

const tempProgressCallback = (ev: TransferProgressEvent) => console.log(ev); // TODO

export const uploadImages = async (files: IOptionWithFile[], mapId: string, uploaderId: string, cb: () => void) => {
    if (!files.length) {
        return;
    }
    const { token } = await generateSas(mapId);
    files.forEach((image) => {
        uploadImage(mapId, uploaderId, image.file, token, image.options, cb);
    });
}

const uploadImage = (mapId: string, uploaderId: string, file: File, token: string, options: IImageOption, cb: () => void) => {
    const fileName = encodeURI(file.name.substr(FILE_NAME_LENGTH));
    if (options.stageId) {
        SubmitHelpers.createImage(uploaderId, (response: ICreateImageResponse) => {
            SubmitHelpers.createStageImage(options.stageId!, uploaderId, response, cb);

            const imageId = response.createImage.image.rowId;
            const blobName = `${imageId}/${fileName}`;
            uploadFile(file, token, mapId, blobName, tempProgressCallback);
        });
    } else {
        SubmitHelpers.createImage(uploaderId, (response: ICreateImageResponse) => {
            SubmitHelpers.createMapImage(mapId, uploaderId, response, options.order!, cb, options.backgroundImage, options.primaryImage);

            const imageId = response.createImage.image.rowId;
            const blobName = `${imageId}/${fileName}`;
            uploadFile(file, token, mapId, blobName, tempProgressCallback);
        });
    }
};
