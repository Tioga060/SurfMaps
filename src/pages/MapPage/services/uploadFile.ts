import { uploadFile as uploadAzureFile, generateSas } from 'shared/resources/azure';
import * as SubmitHelpers from './gqlSubmitHelpers';
import { ICreateFileResponse } from './SubmitMapGQL';
import { TransferProgressEvent } from '@azure/ms-rest-js';
import { IDisplayMapFile } from '../types';
const FILE_NAME_LENGTH = -50;

export interface IMapFileOption {
    gameId: string;
    label: string;
    isPrimary: boolean;
    fileTypeId: string;
    rowId?: string;
}

const tempProgressCallback = (ev: TransferProgressEvent) => console.log(ev); // TODO

export const uploadFiles = async (files: IDisplayMapFile[], mapId: string, uploaderId: string, cb: () => void) => {
    const { token } = await generateSas(mapId);
    files.forEach((file) => {
        const options: IMapFileOption = {
            gameId: file.game.rowId!,
            label: file.description,
            isPrimary: true, //TODO
            fileTypeId: file.fileType.rowId!,
        }
        console.log(file)
        uploadFile(mapId, uploaderId, file.file[0].file!, token, options, cb);
    });
}

const uploadFile = (mapId: string, uploaderId: string, file: File, token: string, options: IMapFileOption, cb: () => void) => {
    const fileName = encodeURI(file.name.substr(FILE_NAME_LENGTH));
    SubmitHelpers.createFile(uploaderId, options.fileTypeId, (response: ICreateFileResponse) => {
        SubmitHelpers.createMapFile(mapId, options.gameId, options.label, uploaderId, response, cb, options.isPrimary);

        const fileId = response.createFile.file.rowId;
        const blobName = `${fileId}/${fileName}`;
        uploadAzureFile(file, token, mapId, blobName, tempProgressCallback);
    });
};
