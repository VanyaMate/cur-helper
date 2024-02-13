import { UserType } from '@/types/user/user.types.ts';


export type RegistrationDataType = {
    email: string;
    login: string;
    password: string;
}

export type LoginDataType =
    {
        email: string;
        password: string;
    }
    | {
        login: string;
        password: string;
    }

export type UserAuthType = {
    user: UserType;
    token: string;
}