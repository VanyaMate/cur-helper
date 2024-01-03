import React from 'react';
import css from './Button.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';


export type ButtonType =
    'default'
    | 'main'
    | 'danger'
    | 'selected'
    | 'hover'
    | 'simple';

export type ButtonProps = {
    prefix?: React.ReactNode | string;
    postfix?: React.ReactNode | string;
    children: React.ReactNode | string;
    styleType?: ButtonType;
    onClick?: () => any;
    block?: boolean;
    disabled?: boolean;
    quad?: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = (props) => {
    const {
              children,
              block,
              postfix,
              prefix,
              styleType,
              className,
              quad,
              disabled,
              onClick,
          } = props;

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
                styleType === 'hover' && css.hover,
                styleType === 'simple' && css.simple,
                disabled && css.disabled,
                quad && css.quad,
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