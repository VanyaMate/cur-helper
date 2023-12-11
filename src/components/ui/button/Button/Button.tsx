import React from 'react';
import css from './Button.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';


export type ButtonType =
    'default' | 'main' | 'danger' | 'selected';

export type ButtonProps = {
    prefix?: React.ReactNode | string;
    postfix?: React.ReactNode | string;
    children: React.ReactNode | string;
    styleType?: ButtonType;
    onClick?: () => any;
    block?: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = (props) => {
    const { children, block, postfix, prefix, styleType, className, onClick } = props;

    return (
        <button
            className={ cn(
                css.container,
                onClick && css.clickable,
                block && css.block,
                className,
                styleType === 'main' && css.main,
                styleType === 'danger' && css.danger,
                styleType === 'selected' && css.selected,
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