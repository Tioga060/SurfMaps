import { uploadFile, generateSas } from 'shared/resources/azure';
import { getFileName } from 'shared/helpers';
import * as SubmitHelpers from './gqlSubmitHelpers';
import { ICreateImageResponse } from './SubmitMapGQL';
import { TransferProgressEvent } from '@azure/ms-rest-js';
import { IOptionWithFile } from '../helpers';

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
    if (!token) {
        return;
    }
    files.forEach((image) => {
        uploadImage(mapId, uploaderId, image.file, token, image.options, cb);
    });
}

const uploadImage = (mapId: string, uploaderId: string, file: File, token: string, options: IImageOption, cb: () => void) => {
    const fileName = getFileName(file.name);
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
            // TODO - handle spaces in file name
            const imageId = response.createImage.image.rowId;
            const blobName = `${imageId}/${fileName}`;
            uploadFile(file, token, mapId, blobName, tempProgressCallback);
        });
    }
};
