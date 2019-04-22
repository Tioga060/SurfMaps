import { IUser } from './';

export interface ITextMarkdown {
    rowId: string;
    text: string;
    createdAt: string;
    updatedAt: string;
    userByAuthorId: IUser;
}
