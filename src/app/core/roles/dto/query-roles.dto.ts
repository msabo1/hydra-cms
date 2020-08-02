export class QueryRolesDto{
    limit?: string;
    offset?: string;
    sortBy?: string;
    order?: string;
    search?:string;
    constructor(getRolesParam?: Partial<GetRolesParam>){
        if(getRolesParam.pageSize){
            this.limit = getRolesParam.pageSize.toString();
        }
        if(getRolesParam.pageIndex){
            this.offset = (getRolesParam.pageIndex * getRolesParam.pageSize).toString();
        }
        if(getRolesParam.sortBy){
            this.sortBy = getRolesParam.sortBy;
        }
        if(getRolesParam.order){
            this.order = getRolesParam.order;
        }
        if(getRolesParam.search){
            this.search = getRolesParam.search;
        }
    }
}

export class GetRolesParam{
    pageIndex: number;
    pageSize: number;
    sortBy?: string;
    order?: string;
    search?:string;
}
