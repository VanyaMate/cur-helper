import React, { useMemo } from 'react';
import css from './P.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';


export type PType =
    'invisible'
    | 'main'
    | 'danger'
    | 'primary'
    | 'second';

export type PTag =
    'div'
    | 'p'
    | 'span';

export type PProps =
    React.HTMLAttributes<HTMLParagraphElement>
    & {
        type?: PType;
        tag?: PTag;
        lines?: number;
    };

const P: React.FC<PProps> = (props) => {
    const { className, type, tag, lines, style, ...other } = props;
    const joinedClassName                                  = useMemo(() => {
        return cn(
            className,
            css.container,
            !!lines && css.lines,
            type === 'invisible' && css.invisible,
            type === 'second' && css.second,
            type === 'main' && css.main,
            type === 'danger' && css.danger,
            type === 'primary' && css.primary,
        );
    }, [ className, type, lines ]);

    const styles = useMemo(() => ({
        ...style,
        WebkitLineClamp: lines ?? '',
    }), [ style, lines ]);

    if (tag === 'div') {
        return (
            <div className={ joinedClassName } { ...other } style={ styles }/>
        );
    } else if (tag === 'span') {
        return (
            <span className={ joinedClassName } { ...other } style={ styles }/>
        );
    } else {
        return (
            <p className={ joinedClassName } { ...other } style={ styles }/>
        );
    }
};

export default React.memo(P);