import React from 'react';


const AdminThemeRedactContainer
          = React.lazy(() => import('@/containers/admin/theme/AdminThemeRedactContainer/AdminThemeRedactContainer.tsx'));


export type AdminGuidRedactPageProps = {};

const AdminGuidRedactPage: React.FC<AdminGuidRedactPageProps> = (props) => {
    const {} = props;

    return <AdminThemeRedactContainer/>;
};

export default React.memo(AdminGuidRedactPage);