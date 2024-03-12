import React from 'react';
import WindowPopup from '@/components/ui/popup/WindowPopup/WindowPopup.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import {
    useWindowPopupController,
} from '@/hooks/ui/popup/WindowPopup/useWindowPopupController.ts';
import Section from '@/components/ui/container/Section/Section.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import { authService } from '@/services/auth/auth.service.ts';
import { adminTestService } from '@/services/admin-tests/admin-test.service.ts';
import { useNavigate } from 'react-router-dom';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';


export type DeleteTestButtonProps = {
    testId: string;
};

const DeleteTestButton: React.FC<DeleteTestButtonProps> = (props) => {
    const { testId }            = props;
    const acceptDeleteTestPopup = useWindowPopupController();
    const pageGetter            = usePageUrl('admin');
    const navigate              = useNavigate();

    return (
        <>
            <WindowPopup controller={ acceptDeleteTestPopup }>
                <Section>
                    <Title>Вы уверены что хотите удалить этот тест?</Title>
                    <Flex>
                        <Button
                            block
                            onClick={ () => acceptDeleteTestPopup.close() }
                            styleType="default"
                        >
                            Нет
                        </Button>
                        <Button
                            onClickAsync={ async () =>
                                adminTestService
                                    .delete(authService.token[0], testId)
                                    .then((deleted: boolean) =>
                                        deleted ? navigate(pageGetter.tests()) : '',
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
                onClick={ acceptDeleteTestPopup.open }
                quad
                size="small"
                styleType="danger"
            >
                <IconM size="small">delete</IconM>
            </Button>
        </>
    );
};

export default React.memo(DeleteTestButton);