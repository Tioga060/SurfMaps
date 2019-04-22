import { IUser } from './user';

export interface IImage {
    storeLocation: string;
    userByUploaderId: IUser;
    uploadedAt: string;
}
