import React from 'react';
import css from './Title.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';


export type TitleSizeType =
    'small' | 'medium' | 'large' | 'extra-large';

export type TitleProps = {
    divider?: boolean;
    size?: TitleSizeType;
} & React.HTMLAttributes<HTMLDivElement>;

const Title: React.FC<TitleProps> = (props) => {
    const { className, divider, size, ...other } = props;

    return (
        <h6 className={ cn(
            className,
            css.container,
            divider && css.bordered,
            (size === 'small') && css.small,
            (size === 'medium') && css.medium,
            (size === 'extra-large') && css.extra_large,
            (size === 'large' || size === undefined) && css.large,
        ) } { ...other }/>
    );
};

export default React.memo(Title);