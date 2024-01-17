export type UserRole =
    'user'
    | 'admin';

export type UserInfo = {
    firstName: string;
    lastName: string;
}

export type User = {
    id: string;
    login: string;
    avatar: string;
    info: Partial<UserInfo>;
    role: UserRole;
}