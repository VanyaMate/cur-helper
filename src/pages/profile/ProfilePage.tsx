import React, { useCallback } from 'react';
import Button from '@/components/ui/button/Button/Button.tsx';
import { useAuthActions } from '@/hooks/auth/useAuthActions.ts';


export type ProfilePageProps = {}

const ProfilePage: React.FC<ProfilePageProps> = (props) => {
    const {}                = props;
    const { login, logout } = useAuthActions();

    const loginCallback = useCallback(() => {
        login({ login: 'VanyaMate', password: '123123123' });
    }, [ login ]);

    const logoutCallback = useCallback(() => {
        logout();
    }, [ logout ]);

    return (
        <div>
            ProfilePage component
            <Button onClick={ loginCallback }>Login</Button>
            <Button onClick={ logoutCallback }>Logout</Button>
        </div>
    );
};

export default React.memo(ProfilePage);