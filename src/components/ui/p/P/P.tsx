import React, { useMemo } from 'react';
import css from './P.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';


export type PItem =
    'invisible' | 'main' | 'danger' | 'primary' | 'second';

export type PType =
    'div' | 'p' | 'span';

export type PProps = React.HTMLAttributes<HTMLParagraphElement> & {
    item?: PItem;
    type?: PType;
};

const P: React.FC<PProps> = (props) => {
    const { className, item, type, ...other } = props;
    const joinedClassName                     = useMemo(() => {
        return cn(
            className,
            css.container,
            item === 'invisible' && css.invisible,
            item === 'second' && css.second,
            item === 'main' && css.main,
            item === 'danger' && css.danger,
            item === 'primary' && css.primary,
        );
    }, [ className, item ]);

    if (type === 'div') {
        return (
            <div className={ joinedClassName } { ...other }/>
        );
    } else if (type === 'span') {
        return (
            <span className={ joinedClassName } { ...other }/>
        );
    } else {
        return (
            <p className={ joinedClassName } { ...other }/>
        );
    }
};

export default React.memo(P);