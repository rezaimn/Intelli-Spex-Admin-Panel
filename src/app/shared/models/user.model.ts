import {RoleModel} from './role.model';

export class UserModel {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    status: boolean;
    created_at: string;
    updated_at: string;
    roles: RoleModel;
}
