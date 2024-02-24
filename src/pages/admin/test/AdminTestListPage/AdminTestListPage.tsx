import AdminTestsListContainer
    from '@/containers/admin/test/AdminTestsListContainer/AdminTestsListContainer.tsx';
import React, { useEffect } from 'react';
import { authService } from '@/services/auth/auth.service.ts';
import { adminTestService } from '@/services/admin-tests/admin-test.service.ts';


export type AdminTestListPageProps = {};

const AdminTestListPage: React.FC<AdminTestListPageProps> = (props) => {
    const {} = props;
    useEffect(() => {
        adminTestService.getMany(authService.token[0]).then();
    }, []);

    return (
        <AdminTestsListContainer/>
    );
};

export default React.memo(AdminTestListPage);