import React from 'react';
import css from './Button.module.scss';
import { cn } from '@/helpers/cn.react.ts';


export type ButtonType =
    'default' | 'main';

export type ButtonProps = {
    children: React.ReactNode | string;
    styleType?: ButtonType;
}

const Button: React.FC<ButtonProps> = (props) => {
    const { children, styleType } = props;

    return (
        <button className={ cn(
            css.container,
            styleType === 'main' && css.main,
        ) }>
            { children }
        </button>
    );
};

export default React.memo(Button);