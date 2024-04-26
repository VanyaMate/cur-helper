import React, { useCallback } from 'react';
import {
    useWindowPopupController,
} from '@/hooks/ui/popup/WindowPopup/useWindowPopupController.ts';
import WindowPopup from '@/components/ui/popup/WindowPopup/WindowPopup.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import TitleSection from '@/components/ui/container/TitleSection/TitleSection.tsx';
import { adminThemeService } from '@/services/admin-theme/admin-theme.service.ts';
import { authService } from '@/services/auth/auth.service.ts';
import { observer } from 'mobx-react-lite';
import AdminThemePreviewItemWithConnect
    from '@/widgets/admin/theme/AdminThemePreviewItemWithConnect/AdminThemePreviewItemWithConnect.tsx';
import {
    adminThemeQuestionService,
} from '@/services/admin-theme-question/admin-theme-question.service.ts';
import {
    adminQuestionService,
} from '@/services/admin-question/admin-question.service.ts';
import { AdminThemeShortType } from '@vanyamate/cur-helper-types';


export type AdminOpenAddThemeToQuestionFormButtonFeatureProps = {
    questionId: string;
};

const AdminOpenAddThemeToQuestionFormButtonFeature: React.FC<AdminOpenAddThemeToQuestionFormButtonFeatureProps> = observer((props) => {
    const { questionId }           = props;
    const themeToQuestionFormPopup = useWindowPopupController();
    const themes                   = adminThemeService.unlinkedForQuestion.get(questionId);
    const question                 = adminQuestionService.questions.get(questionId);

    const onOpenPopupHandler = useCallback(() => {
        themeToQuestionFormPopup.open();
        adminThemeService.getManyUnlinkedForQuestion(authService.token[0], questionId);
    }, [ questionId, themeToQuestionFormPopup ]);

    // TODO: Refucktoring ( Kakoy ujas )
    const onConnectHandler: (state: boolean, themeId: string) => Promise<boolean> = useCallback(async (_: boolean, themeId: string) => {
        if (themes) {
            return adminThemeQuestionService
                .addQuestionToTheme(authService.token[0], { questionId, themeId })
                .then((state) => {
                    if (state) {
                        let addedTheme: AdminThemeShortType | null = null;
                        themes.list                                = themes?.list.filter((theme) => {
                            if (theme.id === themeId) {
                                addedTheme = theme;
                                return false;
                            }
                            return true;
                        });
                        if (question && addedTheme !== null) {
                            question.themes.push(addedTheme);
                        }
                    }
                    return state;
                });
        }
        return false;
    }, [ questionId, themes, question ]);

    return (
        <>
            <WindowPopup controller={ themeToQuestionFormPopup }>
                <TitleSection
                    title="Неподключенные темы"
                    type="default"
                >
                    {
                        themes?.list.map((theme) =>
                            <AdminThemePreviewItemWithConnect
                                defaultState={ false }
                                key={ theme.id }
                                onConnect={ onConnectHandler }
                                theme={ theme }
                            />,
                        )
                    }
                </TitleSection>
            </WindowPopup>
            <Button
                onClick={ onOpenPopupHandler }
                quad
                size="small"
            >
                <IconM size="small">add</IconM>
            </Button>
        </>
    );
});

export default React.memo(AdminOpenAddThemeToQuestionFormButtonFeature);