import { uploadFile, generateSas } from 'shared/resources/azure';
import { getFileName } from 'shared/helpers';
import * as SubmitHelpers from './gqlSubmitHelpers';
import { TransferProgressEvent } from '@azure/ms-rest-js';
import { IOptionWithFile } from '../helpers';

export interface IImageOption {
    stageId?: string
    order?: number;
    primaryImage?: boolean;
    backgroundImage?: boolean;
}

const tempProgressCallback = (ev: TransferProgressEvent) => console.log(ev); // TODO

export const uploadImages = async (files: IOptionWithFile[], mapId: string, uploaderId: string) => {
    if (!files.length) {
        return [];
    }
    const { token } = await generateSas(mapId);
    if (!token) {
        return [];
    }
    return files.map((image) => (
        uploadImage(mapId, uploaderId, image.file, token, image.options)
    ));
}

const uploadImage = async (mapId: string, uploaderId: string, file: File, token: string, options: IImageOption) => {
    const fileName = getFileName(file.name);
    const response = await SubmitHelpers.createImage(uploaderId);
    if (options.stageId) {
        await SubmitHelpers.createStageImage(options.stageId!, uploaderId, response);

        const imageId = response.createImage.image.rowId;
        const blobName = `${imageId}/${fileName}`;
        return uploadFile(file, token, mapId, blobName, tempProgressCallback);
    } else {
        await SubmitHelpers.createMapImage(mapId, uploaderId, response, options.order!, options.backgroundImage, options.primaryImage);

        const imageId = response.createImage.image.rowId;
        const blobName = `${imageId}/${fileName}`;
        return uploadFile(file, token, mapId, blobName, tempProgressCallback);
    }
};
