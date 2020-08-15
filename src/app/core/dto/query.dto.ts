export class QueryDto{
    limit?: string;
    offset?: string;
    sortBy?: string;
    order?: string;
    search?: string;

    constructor(getParam?: Partial<GetParam>){
        if(getParam.pageSize){
            this.limit = getParam.pageSize.toString();
        }
        if(getParam.pageIndex){
            this.offset = (getParam.pageIndex * getParam.pageSize).toString();
        }
        const getParamRest: GetParam = {...getParam}
        delete getParamRest.pageIndex
        delete getParamRest.pageSize
        for(let key of Object.keys(getParamRest)){
            if(getParamRest[key]){
                this[key] = getParamRest[key]
            }
        }
    }
}

export class GetParam{
    pageIndex?: number;
    pageSize?: number;
    sortBy?: string;
    order?: string;
    search?: string;
}