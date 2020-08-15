 import { QueryDto, GetParam } from '../../dto/query.dto'

export class QueryUsersDto extends QueryDto{
    limit?: string;
    offset?: string;
    sortBy?: string;
    order?: string;
    cascade?: string;
    search?:string;
    roleId?: string;
    status?: string;
}

export class GetUsersParam extends GetParam{
    roleId?: string;
    status?: string;
}