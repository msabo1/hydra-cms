import { QueryDto, GetParam } from '../../dto/query.dto';

export class QueryPostsDto extends QueryDto{
    title?: string;
    status?: string;
    authorId?: string;
    tag?: string;
    categoryId?: string;
    loadAuthor?: boolean;
    cascade?: boolean;
}

export class GetPostsParam extends GetParam{
    title?: string;
    status?: string;
    authorId?: string;
    tag?: string;
    categoryId?: string;
    loadAuthor?: boolean;
    cascade?: boolean;
}
