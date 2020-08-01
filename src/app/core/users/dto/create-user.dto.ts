export interface CreateUserDto{
    username: string;
    password: string;
    status: string;
    roleId?: string;
}