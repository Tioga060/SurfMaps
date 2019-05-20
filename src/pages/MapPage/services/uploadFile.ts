import { uploadFile as uploadAzureFile, generateSas } from 'shared/resources/azure';
import { getFileName } from 'shared/helpers';
import * as SubmitHelpers from './gqlSubmitHelpers';
import { ICreateFileResponse } from './SubmitMapGQL';
import { TransferProgressEvent } from '@azure/ms-rest-js';
import { IDisplayMapFile } from '../types';

export interface IMapFileOption {
    gameId: string;
    label: string;
    isPrimary: boolean;
    fileTypeId: string;
    rowId?: string;
}

const tempProgressCallback = (ev: TransferProgressEvent) => console.log(ev); // TODO

export const uploadFiles = async (files: IDisplayMapFile[], mapId: string, uploaderId: string) => {
    if (!files.length) {
        return [];
    }
    const { token } = await generateSas(mapId);
    if (!token) {
        return [];
    }
    return files.map((file) => {
        const options: IMapFileOption = {
            gameId: file.game.rowId!,
            label: file.description,
            isPrimary: true, //TODO
            fileTypeId: file.fileType.rowId!,
        }
        return uploadFile(mapId, uploaderId, file.file[0].file!, token, options);
    });
}

const uploadFile = async (mapId: string, uploaderId: string, file: File, token: string, options: IMapFileOption) => {
    const fileName = getFileName(file.name);
    const response = await SubmitHelpers.createFile(uploaderId, options.fileTypeId);
    await SubmitHelpers.createMapFile(mapId, options.gameId, options.label, uploaderId, response, options.isPrimary);

    const fileId = response.createFile.file.rowId;
    const blobName = `${fileId}/${fileName}`;
    return uploadAzureFile(file, token, mapId, blobName, tempProgressCallback);
};
