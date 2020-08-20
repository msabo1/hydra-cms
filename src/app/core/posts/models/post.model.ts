import { Category } from "../../categories/category.model";
import { User } from "../../users/user.model";
import { Tag } from "./tag.model";

export interface Post{
    id: string;
    title: string;
    content: string;
    status: string;
    updatedAt?: Date;
    createdAt: Date;
    imagePath?: string;
    publishOn: Date;
    author?: User;
    authorId?: string;
    categories?: Category[];
    tags?: Tag[];
}