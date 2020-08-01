export class QueryUsersDto{
    limit?: string;
    offset?: string;
    sortBy?: string;
    order?: string;
    cascade?: string;
    search?:string;
    roleId?: string;
    status?: string;

    constructor(getUsersParam?: Partial<GetUsersParam>){
        if(getUsersParam.pageSize){
            this.limit = getUsersParam.pageSize.toString();
        }
        if(getUsersParam.pageIndex){
            this.offset = (getUsersParam.pageIndex * getUsersParam.pageSize).toString();
        }
        if(getUsersParam.sortBy){
            this.sortBy = getUsersParam.sortBy;
        }
        if(getUsersParam.order){
            this.order = getUsersParam.order;
        }
        if(getUsersParam.search){
            this.search = getUsersParam.search;
        }
        if(getUsersParam.roleId){
            this.roleId = getUsersParam.roleId;
        }
        if(getUsersParam.status){
            this.status = getUsersParam.status;
        }
    }
}

export class GetUsersParam{
    pageIndex: number;
    pageSize: number;
    sortBy?: string;
    order?: string;
    search?:string;
    roleId?: string;
    status?: string;
}