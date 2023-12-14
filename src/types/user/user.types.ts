export type UserInfo = {
    firstName: string;
    lastName: string;
}

export type User = {
    id: string;
    login: string;
    info: Partial<UserInfo>;
}