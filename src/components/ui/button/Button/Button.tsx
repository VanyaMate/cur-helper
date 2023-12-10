import React from 'react';
import css from './Button.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';


export type ButtonType =
    'default' | 'main' | 'danger';

export type ButtonProps = {
    prefix?: React.ReactNode | string;
    postfix?: React.ReactNode | string;
    children: React.ReactNode | string;
    styleType?: ButtonType;
    onClick?: () => any;
    className?: string;
}

const Button: React.FC<ButtonProps> = (props) => {
    const { children, postfix, prefix, styleType, className, onClick } = props;

    return (
        <button
            className={ cn(
                css.container,
                className,
                styleType === 'main' && css.main,
                styleType === 'danger' && css.danger,
            ) }
            onClick={ onClick }
        >
            {
                prefix &&
                <span>{ prefix }</span>
            }
            <span>{ children }</span>
            {
                postfix &&
                <span>{ postfix }</span>
            }
        </button>
    );
};

export default React.memo(Button);