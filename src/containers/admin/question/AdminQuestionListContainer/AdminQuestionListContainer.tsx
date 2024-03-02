import React from 'react';
import AdminTestListHeaderExtraWidget
    from '@/widgets/admin/test/AdminTestListHeaderExtraWidget/AdminTestListHeaderExtraWidget.tsx';
import TitleSection from '@/components/ui/container/TitleSection/TitleSection.tsx';
import {
    adminQuestionService,
} from '@/services/admin-question/admin-question.service.ts';
import { observer } from 'mobx-react-lite';
import AdminQuestionListWidget
    from '@/widgets/admin/question/AdminQuestionListWidget/AdminQuestionListWidget';


export type AdminQuestionListContainerProps = {};

const AdminQuestionListContainer: React.FC<AdminQuestionListContainerProps> = observer((props) => {
    const {}           = props;
    const questionList = adminQuestionService.questionList;

    return (
        <TitleSection
            extra={ <AdminTestListHeaderExtraWidget/> }
            title="Список вопросов"
        >
            <AdminQuestionListWidget data={ questionList }/>
        </TitleSection>
    );
});

export default React.memo(AdminQuestionListContainer);