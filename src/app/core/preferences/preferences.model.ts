import { Role } from '../roles/role.model';

export interface Preferences{
    defaultRole: Role;
    defaultRoleId: string;
    visitorRole: Role;
    visitorRoleId: string;
}