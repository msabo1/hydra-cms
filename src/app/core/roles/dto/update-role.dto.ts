import { Privilege } from '../../privileges/privilege.model';

export interface UpdateRoleDto{
    name?: string;
    privileges?: Privilege[]
}