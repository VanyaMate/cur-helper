import React from 'react';
import TitleSection from '@/components/ui/container/TitleSection/TitleSection.tsx';
import { AdminQuestionShortType } from '@vanyamate/cur-helper-types';
import AdminQuestionPreviewItemFeature
    from '@/widgets/admin/question/AdminQuestionPreviewItemWidget/AdminQuestionPreviewItemWidget.tsx';
import { observer } from 'mobx-react-lite';
import {
    adminThemeQuestionService,
} from '@/services/admin-theme-question/admin-theme-question.service.ts';
import Toggle from '@/components/ui/input/checkbox/Toggle/Toggle.tsx';
import { authService } from '@/services/auth/auth.service.ts';
import {
    adminTestQuestionService,
} from '@/services/admin-test-question/admin-test-question.service.ts';


export type AdminUnlinkedQuestionListWidgetProps = {
    unlinkedQuestionsList: AdminQuestionShortType[];
    onConnect?: (question: AdminQuestionShortType) => void;
    themeId?: string;
    testId?: string;
};

const AdminUnlinkedQuestionListWidget: React.FC<AdminUnlinkedQuestionListWidgetProps> = observer((props) => {
    const { unlinkedQuestionsList, themeId, testId, onConnect } = props;

    return (
        <TitleSection
            title={ `Неподключенные вопросы (${ unlinkedQuestionsList.length })` }
            type="default"
        >
            {
                unlinkedQuestionsList.map((question) => (
                    <AdminQuestionPreviewItemFeature
                        extra={
                            <Toggle
                                active={ false }
                                onToggleAsync={ async () => {
                                    if (themeId) {
                                        adminThemeQuestionService
                                            .addQuestionToTheme(authService.token[0], {
                                                themeId,
                                                questionId: question.id,
                                            })
                                            .then((result) => {
                                                if (result) {
                                                    unlinkedQuestionsList.splice(unlinkedQuestionsList.findIndex((que) => que.id === question.id), 1);
                                                    onConnect && onConnect(question);
                                                }
                                                return result;
                                            });
                                    } else if (testId) {
                                        adminTestQuestionService
                                            .addQuestionToTest(authService.token[0], testId, question.id)
                                            .then((result) => {
                                                if (result) {
                                                    unlinkedQuestionsList.splice(unlinkedQuestionsList.findIndex((que) => que.id === question.id), 1);
                                                    onConnect && onConnect(question);
                                                }
                                                return result;
                                            });
                                    }

                                    return false;
                                } }
                                size="small"
                            />
                        }
                        key={ question.id }
                        question={ question }
                    />
                ))
            }
        </TitleSection>
    );
});

export default React.memo(AdminUnlinkedQuestionListWidget);