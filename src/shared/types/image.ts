import { IUser } from './user';

export interface IImage {
    storeLocation: string;
    uploader: IUser;
    uploadedAt: string;
}
