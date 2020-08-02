import { Privilege } from '../../privileges/privilege.model';

export interface CreateRoleDto{
    name: string;
    privileges?: Privilege[]
}