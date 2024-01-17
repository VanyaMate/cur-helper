import React from 'react';
import css from './Title.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';


export type TitleSizeType =
    'small'
    | 'medium'
    | 'large'
    | 'extra-large';

export type TitleProps =
    {
        divider?: boolean;
        size?: TitleSizeType;
        lines?: number;
    }
    & React.HTMLAttributes<HTMLDivElement>;

const Title: React.FC<TitleProps> = (props) => {
    const { className, divider, size, lines, style, ...other } = props;

    return (
        <h6
            className={ cn(
                className,
                css.container,
                divider && css.bordered,
                !!lines && css.lines,
                (size === 'small') && css.small,
                (size === 'medium') && css.medium,
                (size === 'extra-large') && css.extra_large,
                (size === 'large' || size === undefined) && css.large,
            ) }
            style={ { ...style, WebkitLineClamp: lines ?? '' } }
            { ...other }
        />
    );
};

export default React.memo(Title);