import React, { useState } from 'react';
import WindowPopup from '@/components/ui/popup/WindowPopup/WindowPopup.tsx';
import Section from '@/components/ui/container/Section/Section.tsx';
import Input from '@/components/ui/input/Input/Input.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import { adminThemeService } from '@/services/admin-theme/admin-theme.service.ts';
import { authService } from '@/services/auth/auth.service.ts';
import IconM from '@/components/ui/icon/IconM.tsx';
import {
    useWindowPopupController,
} from '@/hooks/ui/popup/WindowPopup/useWindowPopupController.ts';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';
import { useNavigate } from 'react-router-dom';


export type AdminOpenCreateThemeFormButtonFeatureProps = {};

const AdminOpenCreateThemeFormButtonFeature: React.FC<AdminOpenCreateThemeFormButtonFeatureProps> = (props) => {
    const {}                  = props;
    const createThemePopup    = useWindowPopupController();
    const [ id, setId ]       = useState<string>('');
    const [ title, setTitle ] = useState<string>('');
    const pageGetter          = usePageUrl('admin');
    const navigate            = useNavigate();

    return (
        <>
            <WindowPopup controller={ createThemePopup }>
                <Section>
                    <Input
                        label="Публичный ID"
                        onChangeHandler={ setId }
                        placeholder="Введите ID темы"
                        value={ id }
                    />
                    <Input
                        label="Заголовок"
                        onChangeHandler={ setTitle }
                        placeholder="Введите заголовок темы"
                        value={ title }
                    />
                    <Button
                        disabled={ id.trim() === '' || title.trim() === '' }
                        onClick={
                            () =>
                                adminThemeService
                                    .create(authService.token[0], {
                                        publicId: id, title,
                                    })
                                    .then(({ publicId }) => navigate(pageGetter.guid(publicId)))
                                    .catch((e) => console.log('error', e))
                                    .finally(() => {
                                        setId('');
                                        setTitle('');
                                    })
                        }
                    >
                        Создать
                    </Button>
                </Section>
            </WindowPopup>
            <Button
                onClick={ () => createThemePopup.open() }
                quad
                size="small"
                styleType="default"
            >
                <IconM size="small">add</IconM>
            </Button>
        </>
    );
};

export default React.memo(AdminOpenCreateThemeFormButtonFeature);