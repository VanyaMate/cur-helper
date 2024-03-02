import React, { useState } from 'react';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import {
    useWindowPopupController,
} from '@/hooks/ui/popup/WindowPopup/useWindowPopupController.ts';
import Section from '@/components/ui/container/Section/Section.tsx';
import Input from '@/components/ui/input/Input/Input.tsx';
import { adminTestService } from '@/services/admin-tests/admin-test.service.ts';
import { authService } from '@/services/auth/auth.service.ts';
import WindowPopup from '@/components/ui/popup/WindowPopup/WindowPopup.tsx';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';
import { useNavigate } from 'react-router-dom';


export type AdminOpenCreateTestFormButtonFeatureProps = {
    themeId?: string;
};

const AdminOpenCreateTestFormButtonFeature: React.FC<AdminOpenCreateTestFormButtonFeatureProps> = (props) => {
    const { themeId }                         = props;
    const [ publicThemeId, setPublicThemeId ] = useState<string>(themeId ?? '');
    const [ title, setTitle ]                 = useState<string>('');
    const createTestPopup                     = useWindowPopupController();
    const pageGetter                          = usePageUrl('admin');
    const navigate                            = useNavigate();

    return (
        <>
            <WindowPopup controller={ createTestPopup }>
                <Section>
                    <Input
                        label="Публичный ID темы к которому привязать тест"
                        onChangeHandler={ setPublicThemeId }
                        placeholder="Введите публичный ID темы"
                        value={ publicThemeId }
                    />
                    <Input
                        label="Заголовок"
                        onChangeHandler={ setTitle }
                        placeholder="Введите заголовок"
                        value={ title }
                    />
                    <Button
                        disabled={ publicThemeId.trim() === '' || title.trim() === '' }
                        onClickAsync={ async () =>
                            adminTestService
                                .create(authService.token[0], {
                                    themeId: publicThemeId, title,
                                })
                                .then(({ id }) => navigate(pageGetter.test(id)))
                                .catch((e) => console.log('error', e))
                                .finally(() => {
                                    setPublicThemeId(themeId ?? '');
                                    setTitle('');
                                })
                        }
                        prefix={ <IconM>add</IconM> }
                    >
                        Создать
                    </Button>
                </Section>
            </WindowPopup>
            <Button
                onClick={ createTestPopup.open }
                quad
                size="small"
                styleType="default"
            >
                <IconM size="small">add</IconM>
            </Button>
        </>
    );
};

export default React.memo(AdminOpenCreateTestFormButtonFeature);