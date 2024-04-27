import React from 'react';
import { UserAuthForm } from '@/widgets/user/form/UserAuthForm/UserAuthForm.tsx';


export type ProfilePageProps = {}

const ProfilePage: React.FC<ProfilePageProps> = (props) => {
    const {} = props;
    return (
        <div>
            <UserAuthForm/>
        </div>
    );
};

export default React.memo(ProfilePage);