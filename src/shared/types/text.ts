import { IUser } from './';

export interface ITextMarkdown {
    id: string;
    text: string;
    createdAt: string;
    updatedAt: string;
    author: IUser;
}
