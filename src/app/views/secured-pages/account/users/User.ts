import { Role } from '../roles/Role';

export class User {
    public userId: number;
    public username: string;
    public surname: string;
    public givenName: string;
    public password: string;
    public lastLogin: string;
    public loginCount: number;
    public theme: string;
    public picture: string;
    public roles: Role[];
    public rolesString: string;
    public status: string;
    public createdOn: string;
    public createdBy: string;
    public updatedOn: string;
    public updatedBy: string;
}
