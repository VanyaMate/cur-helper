import React from 'react';
import css from './Tag.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';


export type TagProps = {
    type: 'perfect' | 'danger' | 'main' | 'second' | 'invisible' | 'process';
    children: React.ReactNode;
};

const Tag: React.FC<TagProps> = (props) => {
    const { type, children } = props;

    return (
        <div
            className={ cn(
                css.container,
                type === 'perfect' && css.perfect,
                type === 'danger' && css.danger,
                type === 'main' && css.main,
                type === 'second' && css.second,
                type === 'invisible' && css.invisible,
                type === 'process' && css.process,
            ) }
        >
            { children }
        </div>
    );
};

export default React.memo(Tag);