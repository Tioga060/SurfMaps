import { IUser, IFileType } from './';

export interface IFile {
    rowId: string;
    storeLocation: string;
    createdAt: string;
    isOrphan: boolean;
    userByUploaderId: IUser;
    fileTypeByFileTypeId: IFileType;
}
