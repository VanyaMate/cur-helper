import React from 'react';
import css from './box.module.scss';
import { cn } from '@/helpers/cn.react.ts';
import { SectionSize } from '@/components/ui/container/box/Section.tsx';


export type ArticleProps = React.HTMLAttributes<HTMLDivElement> & {
    size?: SectionSize;
};

const Article: React.FC<ArticleProps> = (props) => {
    const { className, size, ...other } = props;

    return (
        <article className={ cn(
            css.container,
            className,
            size === 'medium' && css.medium,
            size === 'large' && css.large,
            (size === 'small' || !size) && css.small,
        ) } { ...other }/>
    );
};

export default React.memo(Article);