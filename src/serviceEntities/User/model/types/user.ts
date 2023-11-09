import { UserRole } from '../consts/userConsts';

export interface User {
    id: string;
    username: string;
    avatar?: string;
    token ?: string;
    roles?: UserRole[];
}

export interface UserSchema {
    authData?: User;

    _inited: boolean;
}
