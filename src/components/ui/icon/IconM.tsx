import React from 'react';
import css from './IconM.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';


export type IconMSize =
    'small'
    | 'medium'
    | 'large';

export type IconMType =
    'default'
    | 'invisible';

export type IconMProps = {
    children: string;
    className?: string;
    size?: IconMSize;
    type?: IconMType;
};

const IconM: React.FC<IconMProps> = (props) => {
    const { children, className, size, type } = props;

    return (
        <span className={ cn(
            'material-symbols-outlined',
            className,
            css.container,
            size === 'small' && css.small,
            size === 'large' && css.large,
            (size === 'medium' || !size) && css.medium,
            type === 'invisible' && css.invisible,
        ) }>{ children }</span>
    );
};

export default React.memo(IconM);