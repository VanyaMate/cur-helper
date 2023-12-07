import React from 'react';
import { cn } from '@/helpers/cn.react.ts';
import css from '@/components/ui/container/box/box.module.scss';


export type SectionSize =
    'small' | 'medium' | 'large';

export type SectionProps = React.HTMLAttributes<HTMLDivElement> & {
    size?: SectionSize;
};

const Section: React.FC<SectionProps> = (props) => {
    const { className, size, ...other } = props;

    return (
        <section className={ cn(
            css.container,
            className,
            size === 'medium' && css.medium,
            size === 'large' && css.large,
            (size === 'small' || !size) && css.small
        ) } { ...other }/>
    );
};

export default React.memo(Section);