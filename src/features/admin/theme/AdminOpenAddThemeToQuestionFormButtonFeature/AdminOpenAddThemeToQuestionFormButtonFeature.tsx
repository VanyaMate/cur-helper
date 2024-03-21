import React, { useCallback } from 'react';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import {
    useWindowPopupController,
} from '@/hooks/ui/popup/WindowPopup/useWindowPopupController.ts';
import WindowPopup from '@/components/ui/popup/WindowPopup/WindowPopup.tsx';
import AdminCreateQuestionFormWidget
    from '@/widgets/admin/question/AdminCreateQuestionFormWidget/AdminCreateQuestionFormWidget';
import AdminUnlinkedQuestionListWidget
    from '@/widgets/admin/question/AdminUnlinkedQuestionListWidget/AdminUnlinkedQuestionListWidget.tsx';
import {
    adminQuestionService,
} from '@/services/admin-question/admin-question.service.ts';
import { authService } from '@/services/auth/auth.service.ts';
import { AdminQuestionShortType } from '@vanyamate/cur-helper-types';
import { observer } from 'mobx-react-lite';
import Section from '@/components/ui/container/Section/Section.tsx';


export type AdminOpenAddThemeToQuestionFormButtonFeatureProps = {
    themeId: string;
    publicThemeId: string;
    onConnect?: (question: AdminQuestionShortType) => void;
};

const AdminOpenAddThemeToQuestionFormButtonFeature: React.FC<AdminOpenAddThemeToQuestionFormButtonFeatureProps> = observer((props) => {
    const { publicThemeId, themeId, onConnect }       = props;
    const addQuestionToThemeForm                      = useWindowPopupController();
    const unlinkedQuestions: AdminQuestionShortType[] = adminQuestionService.unlinkedForTheme.get(themeId)?.list ?? [];

    const onClickHandler = useCallback(() => {
        addQuestionToThemeForm.open();
        adminQuestionService.findManyUnlinkedForTheme(authService.token[0], themeId);
    }, []);

    return (
        <>
            <WindowPopup controller={ addQuestionToThemeForm }>
                <Section>
                    <AdminCreateQuestionFormWidget
                        defaultThemePublicId={ publicThemeId }
                    />
                    <AdminUnlinkedQuestionListWidget
                        themeId={ themeId }
                        unlinkedQuestionsList={ unlinkedQuestions }
                        onConnect={ onConnect }
                    />
                </Section>
            </WindowPopup>
            <Button
                onClick={ onClickHandler }
                quad
                size="small"
                styleType="default"
            >
                <IconM size="small">add</IconM>
            </Button>
        </>
    );
});

export default React.memo(AdminOpenAddThemeToQuestionFormButtonFeature);