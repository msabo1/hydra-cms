import { Privilege } from "../privileges/privilege.model";

export class Role{
    id?: string;
    name: string;
    privileges: Privilege[];
    createdAt?: Date;
    updatedAt?: Date;

    constructor(role?: Partial<Role>){
        this.id = role.id;
        this.name = role.name;
        this.privileges = role.privileges;
        this.createdAt = role.createdAt;
        this.updatedAt = role.updatedAt;

    }
    hasPrivilege(permission: string, group: string): boolean{
        for(let privilege of this.privileges){
            if(privilege.permission.name == permission && privilege.group.name == group){
                return true;
            }
        }
        return false;
    }
}