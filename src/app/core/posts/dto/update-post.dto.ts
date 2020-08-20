import { Tag } from "../models/tag.model";
import { Category } from "../../categories/category.model";

export interface UpdatePostDto{
    title?: string;
    status?: string;
    content?: string;
    imagePath?: string;
    publishOn?: Date;
    tags?: Tag[];
    categories?: Category[];
}