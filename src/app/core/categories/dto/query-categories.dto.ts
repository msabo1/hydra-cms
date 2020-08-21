import { QueryDto } from '../../dto/query.dto';

export interface QueryCategoriesDto extends QueryDto{
    name?: string;
    parentId?: string;
    loadParent?: boolean;
    loadChildren?: boolean;
}