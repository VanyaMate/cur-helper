import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GUID_ID } from '@/constants/pages.ts';
import { authService } from '@/services/auth/auth.service.ts';
import { adminThemeService } from '@/services/admin-theme/admin-theme.service.ts';


const AdminThemeRedactContainer
          = React.lazy(() => import('@/containers/admin/theme/AdminThemeRedactContainer/AdminThemeRedactContainer.tsx'));


export type AdminGuidRedactPageProps = {};

const AdminGuidRedactPage: React.FC<AdminGuidRedactPageProps> = (props) => {
    const {}                    = props;
    const { [GUID_ID]: guidId } = useParams<{ [GUID_ID]: string }>();

    // TODO: Add admin service
    useEffect(() => {
        if (guidId) {
            adminThemeService.getOne(authService.token[0], guidId).then();
        }
    }, [ guidId ]);

    if (!guidId) {
        return null;
    }

    return <AdminThemeRedactContainer id={ guidId }/>;
};

export default React.memo(AdminGuidRedactPage);