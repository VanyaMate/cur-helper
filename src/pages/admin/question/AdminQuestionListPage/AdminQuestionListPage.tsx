import React, { useEffect } from 'react';
import {
    adminQuestionService,
} from '@/services/admin-question/admin-question.service.ts';
import { authService } from '@/services/auth/auth.service.ts';


const AdminQuestionListContainer
          = React.lazy(() => import('@/containers/admin/question/AdminQuestionListContainer/AdminQuestionListContainer.tsx'));


export type AdminQuestionListPageProps = {};

const AdminQuestionListPage: React.FC<AdminQuestionListPageProps> = (props) => {
    const {} = props;

    useEffect(() => {
        adminQuestionService.findMany(authService.token[0]).then();
    }, []);

    return (
        <AdminQuestionListContainer/>
    );
};

export default React.memo(AdminQuestionListPage);