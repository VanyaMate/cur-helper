import React, { useEffect } from 'react';


const AdminQuestionRedactContainer
          = React.lazy(() => import('@/containers/admin/question/AdminQuestionRedactContainer/AdminQuestionRedactContainer.tsx'));
import { QUESTION_ID } from '@/constants/pages.ts';
import { useParams } from 'react-router-dom';
import { authService } from '@/services/auth/auth.service.ts';
import {
    adminQuestionService,
} from '@/services/admin-question/admin-question.service.ts';


export type AdminQuestionRedactPageProps = {};

const AdminQuestionRedactPage: React.FC<AdminQuestionRedactPageProps> = (props) => {
    const {}                            = props;
    const { [QUESTION_ID]: questionId } = useParams<{ [QUESTION_ID]: string }>();

    useEffect(() => {
        if (questionId) {
            adminQuestionService.findOne(authService.token[0], questionId).then();
        }
    }, [ questionId ]);

    if (!questionId) {
        return null;
    }

    return (
        <AdminQuestionRedactContainer id={ questionId }/>
    );
};

export default React.memo(AdminQuestionRedactPage);