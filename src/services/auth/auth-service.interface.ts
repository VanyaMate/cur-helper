import {
    UserAuthType,
} from '@/types/auth/auth.types.ts';
import {
    LoginDataType,
    RegistrationDataType,
} from '@vanyamate/cur-helper-types';


export interface IAuthService {
    authenticated: boolean;
    pending: boolean;
    error: string;
    token: [ string, boolean ];

    getToken (): [ string, boolean ];

    login (loginData: LoginDataType, remember?: boolean): Promise<UserAuthType>;

    registration (registrationData: RegistrationDataType, remember?: boolean): Promise<UserAuthType>;

    refresh (): Promise<UserAuthType | null>;

    logout (): Promise<boolean>;
}