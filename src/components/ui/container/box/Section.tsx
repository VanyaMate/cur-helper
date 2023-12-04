import React from 'react';
import { cn } from '@/helpers/cn.react.ts';
import css from '@/components/ui/container/box/box.module.scss';


export type SectionProps = React.HTMLAttributes<HTMLDivElement>;

const Section: React.FC<SectionProps> = (props) => {
    const { className, ...other } = props;

    return (
        <section className={ cn(css.container, className) } { ...other }/>
    );
};

export default React.memo(Section);