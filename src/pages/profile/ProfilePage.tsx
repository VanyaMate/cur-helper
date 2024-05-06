import React, { lazy } from 'react';
import {
    UserAuthForm,
} from '@/widgets/user/form/UserAuthForm/UserAuthForm.tsx';
import { useUserData } from '@/hooks/user/useUserData.ts';
import { observer } from 'mobx-react-lite';
import Loader from '@/components/common/Loader/Loader.tsx';


const ProfilePageContainer = lazy(() => import('@/containers/profile/ProfilePageContainer/ProfilePageContainer.tsx'));


export type ProfilePageProps = {}

const ProfilePage: React.FC<ProfilePageProps> = observer((props) => {
    const {}                = props;
    const { process, data } = useUserData();

    return (
        <div>
            {
                process ? <Loader/> :
                data ? <ProfilePageContainer user={ data }/> :
                <UserAuthForm/>
            }
        </div>
    );
});

export default React.memo(ProfilePage);