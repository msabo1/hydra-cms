import { Category } from "../category.model";

export interface UpdateCategoryDto{
    name?: string;
    parentId?: string;
    children?: Category[];
}