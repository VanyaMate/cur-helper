import { FC, memo, ComponentPropsWithoutRef, useCallback } from 'react';
import css from './UserLoginForm.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';
import { useAuthActions } from '@/hooks/auth/useAuthActions.ts';
import { useInput } from '@/hooks/ui/input/useInput.ts';
import Section from '@/components/ui/container/Section/Section.tsx';
import Input from '@/components/ui/input/Input/Input.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';


export type UserLoginFormProps =
    {
        onFinish?: () => void;
    }
    & ComponentPropsWithoutRef<'div'>;

export const UserLoginForm: FC<UserLoginFormProps> = memo(function UserLoginForm (props) {
    const { className, onFinish, ...other } = props;
    const { login }                         = useAuthActions();

    const [ loginValue, onChangeLogin ] = useInput({});
    const [ passwordValue, onChangePassword ] = useInput({});

    const loginCallback = useCallback(() => {
        return login({
            login   : loginValue,
            password: passwordValue,
        }, true).then(onFinish);
    }, [ login, loginValue, passwordValue ]);

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
    );
});