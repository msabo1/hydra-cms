export interface Category{
    id: string;
    name: string;
    updatedAt?: Date;
    createdAt: Date;
    parentId?: string;
    children?: Category[];
}