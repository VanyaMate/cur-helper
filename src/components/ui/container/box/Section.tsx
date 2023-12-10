import React, { useMemo } from 'react';
import css from '@/components/ui/container/box/box.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';


export type SectionSize =
    'small' | 'medium' | 'large';

export type SectionType =
    'article' | 'section' | 'div';

export type SectionItem =
    'main' | 'second' | true;

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
            size === 'medium' && css.medium,
            size === 'large' && css.large,
            (size === 'small' || !size) && css.small,
        );
    }, [ size, item, className ]);

    if (type === 'article') {
        return <article className={ classNames } { ...other }/>;
    } else if (type === 'div') {
        return <div className={ classNames } { ...other }/>;
    } else {
        return <section className={ classNames } { ...other }/>;
    }
};

export default React.memo(Section);