import React, { useCallback } from 'react';
import Toggle from '@/components/ui/input/checkbox/Toggle/Toggle.tsx';
import {
    adminThemeQuestionService,
} from '@/services/admin-theme-question/admin-theme-question.service.ts';
import { authService } from '@/services/auth/auth.service.ts';
import {
    adminTestQuestionService,
} from '@/services/admin-test-question/admin-test-question.service.ts';


export type AdminQuestionConnectToggleButtonProps = {
    onConnect?: (successful: boolean) => void;
    onDisconnect?: (successful: boolean) => void;
    isConnected: boolean;
    questionId: string;
    themeId?: string;
    testId?: string;
};

const AdminQuestionConnectToggleButton: React.FC<AdminQuestionConnectToggleButtonProps> = (props) => {
    const { onConnect, onDisconnect, isConnected, questionId, themeId, testId } = props;

    const onToggleHandler = useCallback(async (connect: boolean) => {
        if (connect) {
            if (themeId) {
                return adminThemeQuestionService
                    .addQuestionToTheme(authService.token[0], {
                        questionId, themeId,
                    })
                    .then((state) => {
                        onConnect && onConnect(state);
                        return state;
                    });
            } else if (testId) {
                return adminTestQuestionService
                    .addQuestionToTest(authService.token[0], testId, questionId)
                    .then((state) => {
                        onConnect && onConnect(state);
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
                        onDisconnect && onDisconnect(state);
                        return state;
                    });
            } else if (testId) {
                return adminTestQuestionService
                    .removeQuestionFromTest(authService.token[0], testId, questionId)
                    .then((state) => {
                        onDisconnect && onDisconnect(state);
                        return state;
                    });
            }
            return false;
        }
    }, [ onConnect, onDisconnect, questionId, testId, themeId ]);

    return (
        <Toggle
            active={ isConnected }
            onToggleAsync={ onToggleHandler }
            size="small"
        />
    );
};

export default React.memo(AdminQuestionConnectToggleButton);