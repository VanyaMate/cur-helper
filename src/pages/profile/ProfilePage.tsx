import React, { useCallback } from 'react';
import Button from '@/components/ui/button/Button/Button.tsx';
import { API_HOST } from '@/constants/api.url.ts';


export type ProfilePageProps = {}

const ProfilePage: React.FC<ProfilePageProps> = (props) => {
    const {} = props;

    const login = useCallback(() => {
        fetch(`${ API_HOST }/api/v1/auth/login`, {
            method     : 'POST',
            headers    : {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body       : JSON.stringify({
                'login'   : 'VanyaMate',
                'password': '123123123',
            }),
        });
    }, []);

    const logout = useCallback(() => {
        fetch(`${ API_HOST }/api/v1/auth/logout`, {
            method     : 'POST',
            credentials: 'include',
        });
    }, []);

    return (
        <div>
            ProfilePage component
            <Button onClick={ login }>Login</Button>
            <Button onClick={ logout }>Logout</Button>
        </div>
    );
};

export default React.memo(ProfilePage);