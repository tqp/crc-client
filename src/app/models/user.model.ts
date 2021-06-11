import { Role } from './role.model';

export class UserModel {
  public userName: string;
  public userId: number;
  public userUsername: string;
  public userSurname: string;
  public userGivenName: string;
  public password: string;
  public passwordSet: string;
  public passwordReset: number;
  public lastLogin: string;
  public loginCount: number;
  public theme: string;
  public picture: string;
  public positionId: number;
  public positionName: string;
  public roles: Role[];
  public rolesString: string;
  public status: string;
  public createdOn: string;
  public createdBy: string;
  public updatedOn: string;
  public updatedBy: string;
}
