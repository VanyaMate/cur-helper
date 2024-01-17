import React, { useMemo } from 'react';
import css from '@/components/ui/container/Section/Section.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';


export type SectionSize =
    'small' | 'medium' | 'large' | 'extra-small';

export type SectionType =
    'article' | 'section' | 'header' | 'footer' | 'div';

export type SectionItem =
    'main' | 'second' | 'default' | true;

export type SectionProps = React.HTMLAttributes<HTMLDivElement> & {
    size?: SectionSize;
    type?: SectionType;
    item?: SectionItem;
};

const Section: React.FC<SectionProps> = (props) => {
    const { className, size, item, type, ...other } = props;

    const classNames = useMemo(() => {
        return cn(
            css.container,
            className,
            item && css.item,
            item === 'main' && css.main,
            item === 'second' && css.second,
            item === 'default' && css.default,
            size === 'medium' && css.medium,
            size === 'large' && css.large,
            size === 'extra-small' && css.extra_small,
            (size === 'small' || !size) && css.small,
        );
    }, [ size, item, className ]);

    if (type === 'article') {
        return <article className={ classNames } { ...other }/>;
    } else if (type === 'div') {
        return <div className={ classNames } { ...other }/>;
    } else if (type === 'footer') {
        return <footer className={ classNames } { ...other }/>;
    } else if (type === 'header') {
        return <header className={ classNames } { ...other }/>;
    } else {
        return <section className={ classNames } { ...other }/>;
    }
};

export default React.memo(Section);