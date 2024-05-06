import React, { lazy, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { usersService } from '@/services/users/users.service.ts';
import { authService } from '@/services/auth/auth.service.ts';


const ProfilePageContainer = lazy(() => import('@/containers/profile/ProfilePageContainer/ProfilePageContainer.tsx'));


export type ProfilePageProps = {}

const ProfilePage: React.FC<ProfilePageProps> = observer((props) => {
    const {}        = props;
    const { login } = useParams<{ login: string }>();

    useEffect(() => {
        if (login) {
            usersService.getProfileDataByLogin(login, authService.token[0]);
        }
    }, [ login ]);

    if (!login) {
        return 404;
    }

    return (
        <ProfilePageContainer login={ login }/>
    );
});

export default React.memo(ProfilePage);