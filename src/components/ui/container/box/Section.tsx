import React, { useMemo } from 'react';
import css from '@/components/ui/container/box/box.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';


export type SectionSize =
    'small' | 'medium' | 'large';

export type SectionType =
    'article' | 'section';

export type SectionProps = React.HTMLAttributes<HTMLDivElement> & {
    size?: SectionSize;
    type?: SectionType;
    item?: boolean;
};

const Section: React.FC<SectionProps> = (props) => {
    const { className, size, item, type, ...other } = props;

    const classNames = useMemo(() => {
        return cn(
            css.container,
            className,
            item && css.item,
            size === 'medium' && css.medium,
            size === 'large' && css.large,
            (size === 'small' || !size) && css.small,
        );
    }, [ size, item, className ]);

    if (type === 'article') {
        return <article className={ classNames } { ...other }/>;
    } else {
        return <section className={ classNames } { ...other }/>;
    }
};

export default React.memo(Section);