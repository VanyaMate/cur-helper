import { FC, memo, ComponentPropsWithoutRef, useCallback } from 'react';
import css from './UserRegistrationForm.module.scss';
import { cn } from '@vanyamate/helpers/react/classname.ts';
import Input from '@/components/ui/input/Input/Input.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import Section from '@/components/ui/container/Section/Section.tsx';
import { useAuthActions } from '@/hooks/auth/useAuthActions.ts';
import { useInput } from '@/hooks/ui/input/useInput.ts';


export type UserRegistrationFormProps =
    {
        onFinish?: () => void;
    }
    & ComponentPropsWithoutRef<'div'>;

export const UserRegistrationForm: FC<UserRegistrationFormProps> = memo(function UserRegistrationForm (props) {
    const { className, onFinish, ...other } = props;
    const { registration }                  = useAuthActions();

    const [ loginValue, onChangeLogin ]       = useInput({});
    const [ emailValue, onChangeEmail ]       = useInput({});
    const [ passwordValue, onChangePassword ] = useInput({});

    const loginCallback = useCallback(() => {
        return registration({
            login   : loginValue,
            password: passwordValue,
            email   : emailValue,
        }, true).then(onFinish);
    }, [registration, loginValue, passwordValue, emailValue, onFinish]);

    return (
        <Section
            { ...other }
            className={ cn(css.container, className) }
            type="main"
        >
            <Input
                label="Логин"
                onChangeHandler={ onChangeLogin }
                placeholder="Введите логин"
                value={ loginValue }
            />
            <Input
                label="Почта"
                onChangeHandler={ onChangeEmail }
                placeholder="Введите почту"
                value={ emailValue }
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
                Регистрация
            </Button>
        </Section>
    );
});