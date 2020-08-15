import { User } from '../users/user.model';

export interface Page{
    id: string;
    title: string;
    content: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
    author: User;
}