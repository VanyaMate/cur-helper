import React from 'react';


const AdminThemeListContainer = React.lazy(() => import('@/containers/admin/theme/AdminThemeListContainer/AdminThemeListContainer.tsx'));


export type AdminGuidListPageProps = {};

const AdminGuidListPage: React.FC<AdminGuidListPageProps> = (props) => {
    const {} = props;

    return <AdminThemeListContainer/>;
};

export default React.memo(AdminGuidListPage);