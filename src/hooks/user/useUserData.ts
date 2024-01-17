import { User } from '@/types/user/user.types.ts';
import { useMemo } from 'react';


export type UseUserData = {
    process: boolean;
    data: User;
}

export const useUserData = function (): UseUserData {
    return useMemo(() => ({
        process: false,
        data   : {
            id    : '1',
            login : 'VanyaMate',
            avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
            role  : 'admin',
            info  : {
                firstName: 'Иван',
                lastName : 'Иванович',
            },
        },
    }), []);
};