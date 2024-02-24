import React, { useMemo } from 'react';
import css from '@/components/ui/container/Section/Section.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';


export type SectionSize =
    'small'
    | 'medium'
    | 'large'
    | 'extra-small';

export type SectionTag =
    'article'
    | 'section'
    | 'header'
    | 'footer'
    | 'div';

export type SectionType =
    'main'
    | 'second'
    | 'default'
    | 'mark'
    | true;

export type SectionProps =
    React.HTMLAttributes<HTMLDivElement>
    & {
        size?: SectionSize;
        tag?: SectionTag;
        type?: SectionType;
        block?: boolean;
    };

const Section: React.FC<SectionProps> = (props) => {
    const { className, size, type, tag, block, ...other } = props;

    const classNames = useMemo(() => {
        return cn(
            css.container,
            className,
            type && css.item,
            type === 'main' && css.main,
            type === 'second' && css.second,
            type === 'default' && css.default,
            type === 'mark' && css.mark,
            size === 'medium' && css.medium,
            size === 'large' && css.large,
            size === 'extra-small' && css.extra_small,
            block && css.block,
            (size === 'small' || !size) && css.small,
        );
    }, [ className, type, size, block ]);

    if (tag === 'article') {
        return <article className={ classNames } { ...other }/>;
    } else if (tag === 'section') {
        return <section className={ classNames } { ...other }/>;
    } else if (tag === 'footer') {
        return <footer className={ classNames } { ...other }/>;
    } else if (tag === 'header') {
        return <header className={ classNames } { ...other }/>;
    } else {
        return <div className={ classNames } { ...other }/>;
    }
};

export default React.memo(Section);