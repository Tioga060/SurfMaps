import { IUser, IFileType } from './';

export interface IFile {
    rowId: string;
    storeLocation: string;
    createdAt: string;
    active: boolean;
    userByUploaderId: IUser;
    fileTypeByFileTypeId: IFileType;
}
