import { FC, memo, ComponentPropsWithoutRef, useState } from 'react';
import css from './UserAuthForm.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';
import Section from '@/components/ui/container/Section/Section.tsx';
import SpaceBetween from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import { UserLoginForm } from '@/widgets/user/form/UserLoginForm/UserLoginForm.tsx';
import {
    UserRegistrationForm,
} from '@/widgets/user/form/UserRegistrationForm/UserRegistrationForm.tsx';


export type UserAuthFormProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const UserAuthForm: FC<UserAuthFormProps> = memo(function UserAuthForm (props) {
    const { className, ...other }         = props;
    const [ isLoginForm, setIsLoginForm ] = useState<boolean>(true);

    return (
        <Section { ...other } className={ cn(css.container, className) }>
            <SpaceBetween>
                <Button
                    block
                    onClick={ () => setIsLoginForm(true) }
                    styleType={ isLoginForm ? 'selected' : 'default' }
                >
                    Логин
                </Button>
                <Button
                    block
                    onClick={ () => setIsLoginForm(false) }
                    styleType={ !isLoginForm ? 'selected' : 'default' }
                >
                    Регистрация
                </Button>
            </SpaceBetween>
            {
                isLoginForm
                ? <UserLoginForm/>
                : <UserRegistrationForm/>
            }
        </Section>
    );
});