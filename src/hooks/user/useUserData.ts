import { useMemo } from 'react';
import { userService } from '@/services/user/user.service.ts';
import { UserType } from '@vanyamate/cur-helper-types';
import { authService } from '@/services/auth/auth.service.ts';


export type UseUserData = {
    process: boolean;
    data: UserType | null;
}

export const useUserData = function (): UseUserData {
    const process = authService.pending;
    const user    = userService.user;

    return useMemo(() => ({ process, data: user }), [ process, user ]);
};