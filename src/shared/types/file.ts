import { IUser } from './';

export interface IFile {
    id: string;
    storeLocation: string;
    createdAt: string;
    active: boolean;
    uploader: IUser;
    fileType: string;
}
