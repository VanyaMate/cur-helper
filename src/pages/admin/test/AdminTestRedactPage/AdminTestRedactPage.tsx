import React, { useEffect } from 'react';
import AdminTestRedactContainer
    from '@/containers/admin/test/AdminTestRedactContainer/AdminTestRedactContainer.tsx';
import { TEST_ID } from '@/constants/pages.ts';
import { useParams } from 'react-router-dom';
import { authService } from '@/services/auth/auth.service.ts';
import { adminTestService } from '@/services/admin-tests/admin-test.service.ts';


export type AdminTestRedactPageProps = {};

const AdminTestRedactPage: React.FC<AdminTestRedactPageProps> = (props) => {
    const {}                    = props;
    const { [TEST_ID]: guidId } = useParams<{ [TEST_ID]: string }>();

    // TODO: Add admin service
    useEffect(() => {
        if (guidId) {
            adminTestService.getOne(authService.token[0], guidId);
        }
    }, [ guidId ]);

    if (!guidId) {
        return null;
    }

    return <AdminTestRedactContainer id={ guidId }/>;
};

export default React.memo(AdminTestRedactPage);