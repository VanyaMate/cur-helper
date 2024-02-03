import React from 'react';


export type AdminHomePageProps = {};

const AdminHomePage: React.FC<AdminHomePageProps> = (props) => {
    const {} = props;

    return (
        <div>
            AdminHomePageComponent
        </div>
    );
};

export default React.memo(AdminHomePage);