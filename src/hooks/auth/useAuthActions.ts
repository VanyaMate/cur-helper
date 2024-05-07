import {
    UserAuthType,
} from '@/types/auth/auth.types.ts';
import { useCallback } from 'react';
import { authService } from '@/services/auth/auth.service.ts';
import { userService } from '@/services/user/user.service.ts';
import {
    LoginDataType,
    RegistrationDataType,
    UserType,
} from '@vanyamate/cur-helper-types';


export type AuthActions = {
    login: (data: LoginDataType, remember?: boolean) => Promise<UserType>;
    registration: (data: RegistrationDataType, remember?: boolean) => Promise<UserType>;
    refresh: () => Promise<UserType | null>;
    logout: () => Promise<boolean>;
}

export const useAuthActions = function (): AuthActions {
    const login = useCallback(async (data: LoginDataType, remember?: boolean) => {
        const authData: UserAuthType = await authService.login(data, remember);
        userService.set(authData.user);
        // notify
        return authData.user;
    }, []);

    const registration = useCallback(async (data: RegistrationDataType, remember?: boolean) => {
        const authData: UserAuthType = await authService.registration(data, remember);
        userService.set(authData.user);
        // notify
        return authData.user;
    }, []);

    const refresh = useCallback(async () => {
        if (userService.user === null && authService.token) {
            const authData: UserAuthType | null = await authService.refresh();
            if (authData) {
                userService.set(authData.user);
                return authData.user;
            } else {
                return null;
            }
        }

        return null;
    }, []);

    const logout = useCallback(async () => {
        userService.remove();
        await authService.logout();
        return true;
    }, []);

    return {
        login, refresh, logout, registration,
    };
};