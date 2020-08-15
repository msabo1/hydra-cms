import { QueryDto, GetParam } from "../../dto/query.dto"

export class QueryPagesDto extends QueryDto{
    status?: string;
    cascade?: string;
    authorId?: string;
    loadAuthor?: string;
}

export class GetPagesParam extends GetParam{
    status?: string;
    cascade?: string;
    authorId?: string;
    loadAuthor?: string;
}