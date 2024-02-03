import React from 'react';


export type AdminPageProps = {};

const AdminPage: React.FC<AdminPageProps> = (props) => {
    const {} = props;

    return (
        <div>
            AdminPageComponent
        </div>
    );
};

export default React.memo(AdminPage);