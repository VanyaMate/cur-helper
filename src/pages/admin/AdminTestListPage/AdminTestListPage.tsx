import AdminTestsListContainer
    from '@/containers/admin/AdminTestsList/AdminTestsListContainer';
import React from 'react';


export type AdminTestListPageProps = {};

const AdminTestListPage: React.FC<AdminTestListPageProps> = (props) => {
    const {} = props;

    return (
        <AdminTestsListContainer/>
    );
};

export default React.memo(AdminTestListPage);