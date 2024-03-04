import React from 'react';
import TitleSection from '@/components/ui/container/TitleSection/TitleSection.tsx';
import {
    adminQuestionService,
} from '@/services/admin-question/admin-question.service.ts';
import { observer } from 'mobx-react-lite';
import AdminQuestionListWidget
    from '@/widgets/admin/question/AdminQuestionListWidget/AdminQuestionListWidget';
import AdminOpenQuestionCreateFormButtonFeature
    from '@/features/admin/question/AdminOpenQuestionCreateFormButtonFeature/AdminOpenQuestionCreateFormButtonFeature';


export type AdminQuestionListContainerProps = {};

const AdminQuestionListContainer: React.FC<AdminQuestionListContainerProps> = observer((props) => {
    const {}           = props;
    const questionList = adminQuestionService.questionList;

    return (
        <TitleSection
            extra={ <AdminOpenQuestionCreateFormButtonFeature/> }
            title="Список вопросов"
        >
            <AdminQuestionListWidget data={ questionList }/>
        </TitleSection>
    );
});

export default React.memo(AdminQuestionListContainer);