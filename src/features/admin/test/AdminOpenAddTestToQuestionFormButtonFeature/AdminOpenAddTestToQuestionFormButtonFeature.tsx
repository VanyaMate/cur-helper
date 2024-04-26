import React, { useCallback, useEffect } from 'react';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import WindowPopup from '@/components/ui/popup/WindowPopup/WindowPopup.tsx';
import {
    useWindowPopupController,
} from '@/hooks/ui/popup/WindowPopup/useWindowPopupController.ts';
import { observer } from 'mobx-react-lite';
import { adminTestService } from '@/services/admin-tests/admin-test.service.ts';
import { authService } from '@/services/auth/auth.service.ts';
import TitleSection from '@/components/ui/container/TitleSection/TitleSection.tsx';
import Toggle from '@/components/ui/input/checkbox/Toggle/Toggle.tsx';
import AdminTestPreviewItem
    from '@/widgets/admin/test/AdminTestPreviewItem/AdminTestPreviewItem.tsx';
import { AdminTestShortType } from '@vanyamate/cur-helper-types';
import {
    adminTestQuestionService,
} from '@/services/admin-test-question/admin-test-question.service.ts';


export type AdminOpenAddTestToQuestionFormButtonFeatureProps = {
    questionId: string;
    onConnect?: (test: AdminTestShortType) => void;
};

const AdminOpenAddTestToQuestionFormButtonFeature: React.FC<AdminOpenAddTestToQuestionFormButtonFeatureProps> = observer((props) => {
    const { questionId, onConnect } = props;
    const addTestToThemeModal       = useWindowPopupController();
    const testList                  = adminTestService.unlinkedForQuestion.get(questionId);

    const onClickHandler = useCallback(() => {
        addTestToThemeModal.open();
        adminTestService.getManyUnlinkedForQuestion(authService.token[0], questionId);
    }, [ addTestToThemeModal, questionId ]);

    useEffect(() => {
        adminTestService.getMany(authService.token[0]).then();
    }, [ questionId ]);

    return (
        <>
            <WindowPopup controller={ addTestToThemeModal }>
                <TitleSection title="Неподключенные тесты" type="default">
                    {
                        testList ? testList.list.map((test) => (
                            <AdminTestPreviewItem
                                extra={
                                    <Toggle
                                        active={ false }
                                        onToggleAsync={ async () => {
                                            return adminTestQuestionService
                                                .addQuestionToTest(authService.token[0], test.id, questionId)
                                                .then((connected) => {
                                                    if (connected) {
                                                        onConnect && onConnect(test);
                                                        testList.list = testList.list.filter((unlinkedTest) => unlinkedTest.id !== test.id);
                                                    }

                                                    return connected;
                                                });
                                        } }
                                        size="small"
                                    />
                                }
                                key={ test.id }
                                test={ test }
                            />
                        )) : null
                    }
                </TitleSection>
            </WindowPopup>
            <Button
                onClick={ onClickHandler }
                quad
                size="small"
            >
                <IconM size="small">add</IconM>
            </Button>
        </>
    );
});

export default React.memo(AdminOpenAddTestToQuestionFormButtonFeature);