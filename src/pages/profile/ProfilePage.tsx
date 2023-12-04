import React from 'react';


export type ProfilePageProps = {}

const ProfilePage: React.FC<ProfilePageProps> = (props) => {
    const {} = props;

    return (
        <div>
            ProfilePage component
        </div>
    );
};

export default React.memo(ProfilePage);