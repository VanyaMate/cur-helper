import {
    LoginDataType,
    RegistrationDataType,
    UserAuthType,
} from '@/types/auth/auth.types.ts';


export interface IAuthService {
    authenticated: boolean;
    pending: boolean;
    error: string;
    token: [ string, boolean ];

    login (loginData: LoginDataType, remember?: boolean): Promise<UserAuthType>;

    registration (registrationData: RegistrationDataType, remember?: boolean): Promise<UserAuthType>;

    refresh (): Promise<UserAuthType | null>;

    logout (): Promise<boolean>;
}