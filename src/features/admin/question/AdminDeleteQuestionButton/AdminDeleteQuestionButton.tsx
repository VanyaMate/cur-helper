import React from 'react';
import {
    useWindowPopupController,
} from '@/hooks/ui/popup/WindowPopup/useWindowPopupController.ts';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';
import { useNavigate } from 'react-router-dom';
import WindowPopup from '@/components/ui/popup/WindowPopup/WindowPopup.tsx';
import Section from '@/components/ui/container/Section/Section.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import { authService } from '@/services/auth/auth.service.ts';
import IconM from '@/components/ui/icon/IconM.tsx';
import {
    adminQuestionService,
} from '@/services/admin-question/admin-question.service.ts';


export type AdminDeleteQuestionButtonProps = {
    questionId: string;
};

const AdminDeleteQuestionButton: React.FC<AdminDeleteQuestionButtonProps> = (props) => {
    const { questionId }        = props;
    const acceptDeleteFormPopup = useWindowPopupController();
    const pageGetter            = usePageUrl('admin');
    const navigate              = useNavigate();

    return (
        <>
            <WindowPopup controller={ acceptDeleteFormPopup }>
                <Section>
                    <Title>Вы уверены что хотите удалить этот вопрос?</Title>
                    <Flex>
                        <Button
                            block
                            onClick={ () => acceptDeleteFormPopup.close() }
                            styleType="default"
                        >
                            Нет
                        </Button>
                        <Button
                            onClickAsync={ async () =>
                                adminQuestionService
                                    .delete(authService.token[0], questionId)
                                    .then((deleted: boolean) =>
                                        deleted ? navigate(pageGetter.questions()) : '',
                                    )
                            }
                            quad
                            styleType="danger"
                        >
                            Да
                        </Button>
                    </Flex>
                </Section>
            </WindowPopup>
            <Button
                onClick={ acceptDeleteFormPopup.open }
                quad
                size="small"
                styleType="danger"
            >
                <IconM size="small">delete</IconM>
            </Button>
        </>
    );
};

export default React.memo(AdminDeleteQuestionButton);