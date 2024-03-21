import React from 'react';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import WindowPopup from '@/components/ui/popup/WindowPopup/WindowPopup.tsx';
import {
    useWindowPopupController,
} from '@/hooks/ui/popup/WindowPopup/useWindowPopupController.ts';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import Section from '@/components/ui/container/Section/Section.tsx';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';
import { useNavigate } from 'react-router-dom';
import { adminThemeService } from '@/services/admin-theme/admin-theme.service.ts';
import { authService } from '@/services/auth/auth.service.ts';
import Title from '@/components/ui/title/Title/Title.tsx';


export type AdminDeleteThemeButtonProps = {
    themeId: string;
};

const AdminDeleteThemeButton: React.FC<AdminDeleteThemeButtonProps> = (props) => {
    const { themeId }           = props;
    const acceptDeleteFormPopup = useWindowPopupController();
    const pageGetter            = usePageUrl('admin');
    const navigate              = useNavigate();

    return (
        <>
            <WindowPopup controller={ acceptDeleteFormPopup }>
                <Section>
                    <Title>Вы уверены что хотите удалить эту тему?</Title>
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
                                adminThemeService
                                    .delete(authService.token[0], themeId)
                                    .then((deleted: boolean) =>
                                        deleted ? navigate(pageGetter.guids()) : '',
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

export default React.memo(AdminDeleteThemeButton);