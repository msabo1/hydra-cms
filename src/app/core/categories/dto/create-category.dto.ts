import { Category } from "../category.model";

export interface CreateCategoryDto{
    name: string;
    parentId?: string;
    children?: Category[];
}