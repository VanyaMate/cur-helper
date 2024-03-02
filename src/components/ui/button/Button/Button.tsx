import React, { useState } from 'react';
import css from './Button.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';
import IconM from '@/components/ui/icon/IconM.tsx';


export type ButtonType =
    'default'
    | 'main'
    | 'danger'
    | 'selected'
    | 'hover'
    | 'simple';

export type ButtonSize =
    'small'
    | 'medium'
    | 'large';

export type ButtonProps = {
    prefix?: React.ReactNode | string;
    postfix?: React.ReactNode | string;
    children: React.ReactNode | string;
    styleType?: ButtonType;
    size?: ButtonSize;
    onClick?: () => any;
    onClickAsync?: () => Promise<any>;
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
              onClickAsync,
              size,
          } = props;

    const [ loading, setLoading ] = useState<boolean>(false);
    const onClickHandler          = () => {
        if (onClickAsync) {
            setLoading(true);
            onClickAsync().finally(() => {
                setLoading(false);
            });
        } else if (onClick) {
            onClick();
        }
    };

    return (
        <button
            className={ cn(
                css.container,
                (onClick || onClickAsync) && css.clickable,
                block && css.block,
                className,
                size === 'small' && css.smallSize,
                size === 'large' && css.largeSize,
                (size === 'medium' || !size) && css.mediumSize,
                styleType === 'main' && css.main,
                styleType === 'danger' && css.danger,
                styleType === 'selected' && css.selected,
                styleType === 'hover' && css.hover,
                styleType === 'simple' && css.simple,
                disabled && css.disabled,
                quad && css.quad,
            ) }
            onClick={ onClickHandler }
            type="button"
        >
            {
                prefix
                ? <span className={ loading ? 'loading' : '' }>
                   {
                       loading
                       ? <IconM className="loading">cached</IconM>
                       : prefix
                   }
                </span>
                : null
            }
            <span>
                {
                    (quad && loading)
                    ? <IconM className="loading" size="small">cached</IconM>
                    : children
                }
            </span>
            {
                postfix
                ? <span className={ loading ? 'loading' : '' }>
                   {
                       loading
                       ? <IconM className="loading">cached</IconM>
                       : postfix
                   }
                </span>
                : null
            }
        </button>
    );
};

export default React.memo(Button);