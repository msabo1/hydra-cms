import { Role } from "../roles/models/role.model";

export interface User{
    id: string;
    username: string;
    status: string;
    role?: Role;
    roleId: string;
    createdAt: Date;
    updatedAt: Date;
}