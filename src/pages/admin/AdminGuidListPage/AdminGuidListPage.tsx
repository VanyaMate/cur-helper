import React from 'react';
import AdminGuidListContainer
    from '@/containers/admin/guid/AdminGuidListContainer/AdminGuidListContainer.tsx';
import { useParams } from 'react-router-dom';
import AdminGuidListByIdContainer
    from '@/containers/admin/guid/AdminGuidListByIdContainer/AdminGuidListByIdContainer.tsx';


export type AdminThemesPageProps = {};

const AdminGuidListPage: React.FC<AdminThemesPageProps> = (props) => {
    const {}     = props;
    const { id } = useParams<{ id: string }>();

    if (id) {
        return <AdminGuidListByIdContainer id={ id }/>;
    } else {
        return <AdminGuidListContainer/>;
    }
};

export default React.memo(AdminGuidListPage);