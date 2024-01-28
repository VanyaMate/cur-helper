import React, { useMemo } from 'react';
import css from './P.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';


export type PItem =
    'invisible'
    | 'main'
    | 'danger'
    | 'primary'
    | 'second';

export type PType =
    'div'
    | 'p'
    | 'span';

export type PProps =
    React.HTMLAttributes<HTMLParagraphElement>
    & {
        item?: PItem;
        type?: PType;
        lines?: number;
    };

const P: React.FC<PProps> = (props) => {
    const { className, item, type, lines, style, ...other } = props;
    const joinedClassName                                   = useMemo(() => {
        return cn(
            className,
            css.container,
            !!lines && css.lines,
            item === 'invisible' && css.invisible,
            item === 'second' && css.second,
            item === 'main' && css.main,
            item === 'danger' && css.danger,
            item === 'primary' && css.primary,
        );
    }, [ className, item, lines ]);

    const styles = useMemo(() => ({
        ...style,
        WebkitLineClamp: lines ?? '',
    }), [ style, lines ]);

    if (type === 'div') {
        return (
            <div className={ joinedClassName } { ...other } style={ styles }/>
        );
    } else if (type === 'span') {
        return (
            <span className={ joinedClassName } { ...other } style={ styles }/>
        );
    } else {
        return (
            <p className={ joinedClassName } { ...other } style={ styles }/>
        );
    }
};

export default P;