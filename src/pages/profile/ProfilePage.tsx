import React, { useCallback } from 'react';
import Button from '@/components/ui/button/Button/Button.tsx';
import { useAuthActions } from '@/hooks/auth/useAuthActions.ts';
import Input from '@/components/ui/input/Input/Input.tsx';
import { useInput } from '@/hooks/ui/input/useInput.ts';
import Section from '@/components/ui/container/Section/Section.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';


export type ProfilePageProps = {}

const ProfilePage: React.FC<ProfilePageProps> = (props) => {
    const {}                = props;
    const { login, logout } = useAuthActions();

    const [ loginValue, onChangeLogin ]       = useInput({});
    const [ passwordValue, onChangePassword ] = useInput({});

    const loginCallback = useCallback(() => {
        return login({ login: loginValue, password: passwordValue });
    }, [ login, loginValue, passwordValue ]);

    const logoutCallback = useCallback(() => {
        logout();
    }, [ logout ]);

    return (
        <div>
            <Section
                type="main"
            >
                <Input
                    label="Логин"
                    onChangeHandler={ onChangeLogin }
                    placeholder="Введите логин"
                    value={ loginValue }
                />
                <Input
                    label="Пароль"
                    onChangeHandler={ onChangePassword }
                    placeholder="Введите пароль"
                    value={ passwordValue }
                />
                <Button
                    disabled={ !loginValue.length || !passwordValue.length }
                    onClickAsync={ loginCallback }
                    postfix={ <IconM>arrow_right</IconM> }
                    styleType="main"
                >
                    Войти
                </Button>
            </Section>
            <Button onClick={ logoutCallback }>Выйти</Button>
        </div>
    );
};

export default React.memo(ProfilePage);