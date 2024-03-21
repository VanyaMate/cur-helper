import React, { useCallback, useState } from 'react';
import Toggle from '@/components/ui/input/checkbox/Toggle/Toggle.tsx';
import {
    adminThemeQuestionService,
} from '@/services/admin-theme-question/admin-theme-question.service.ts';
import { authService } from '@/services/auth/auth.service.ts';
import {
    adminTestQuestionService,
} from '@/services/admin-test-question/admin-test-question.service.ts';
import { AdminQuestionShortType } from '@vanyamate/cur-helper-types';
import { observer } from 'mobx-react-lite';


export type AdminQuestionConnectToggleByListsFeatureProps = {
    connectedList: AdminQuestionShortType[];
    unlinkedList: AdminQuestionShortType[];
    questionId: string;
    themeId?: string;
    testId?: string;
};

const AdminQuestionConnectToggleByListsFeature: React.FC<AdminQuestionConnectToggleByListsFeatureProps> = observer((props) => {
    const { connectedList, unlinkedList, questionId, testId, themeId } = props;
    const [ connected, setConnected ]                                  = useState<boolean>(!!connectedList.find((connectedQuestion) => connectedQuestion.id === questionId));

    const onToggleHandler = useCallback(async (connect: boolean) => {
        if (connect) {
            if (themeId) {
                return adminThemeQuestionService
                    .addQuestionToTheme(authService.token[0], {
                        questionId, themeId,
                    })
                    .then((state) => {
                        if (state) {
                            const [ unlinkedQuestion ] = unlinkedList.splice(unlinkedList.findIndex((question) => question.id === questionId), 1);
                            connectedList.push(unlinkedQuestion);
                        }
                        setConnected(true);
                        return state;
                    });
            } else if (testId) {
                return adminTestQuestionService
                    .addQuestionToTest(authService.token[0], testId, questionId)
                    .then((state) => {
                        if (state) {
                            const [ unlinkedQuestion ] = unlinkedList.splice(unlinkedList.findIndex((question) => question.id === questionId), 1);
                            connectedList.push(unlinkedQuestion);
                        }
                        setConnected(true);
                        return state;
                    });
            }
            return false;
        } else {
            if (themeId) {
                return adminThemeQuestionService
                    .removeQuestionFromTheme(authService.token[0], {
                        questionId, themeId,
                    })
                    .then((state) => {
                        if (state) {
                            connectedList.splice(connectedList.findIndex((question) => question.id === questionId), 1);
                        }
                        setConnected(false);
                        return state;
                    });
            } else if (testId) {
                return adminTestQuestionService
                    .removeQuestionFromTest(authService.token[0], testId, questionId)
                    .then((state) => {
                        if (state) {
                            connectedList.splice(connectedList.findIndex((question) => question.id === questionId), 1);
                        }
                        setConnected(false);
                        return state;
                    });
            }
            return false;
        }
    }, []);

    return (
        <Toggle
            active={ connected }
            onToggleAsync={ onToggleHandler }
            size="small"
        />
    );
});

export default React.memo(AdminQuestionConnectToggleByListsFeature);