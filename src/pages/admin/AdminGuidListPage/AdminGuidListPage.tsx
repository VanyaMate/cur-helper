import React, { useEffect } from 'react';
import { adminThemeService } from '@/services/admin-theme/admin-theme.service.ts';
import { authService } from '@/services/auth/auth.service.ts';


const AdminThemeListContainer = React.lazy(() => import('@/containers/admin/theme/AdminThemeListContainer/AdminThemeListContainer.tsx'));


export type AdminGuidListPageProps = {};

const AdminGuidListPage: React.FC<AdminGuidListPageProps> = (props) => {
    const {} = props;
    useEffect(() => {
        adminThemeService.getMany(authService.token[0]).then();
    }, []);

    return <AdminThemeListContainer/>;
};

export default React.memo(AdminGuidListPage);