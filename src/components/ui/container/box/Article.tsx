import React from 'react';
import css from './box.module.scss';
import { cn } from '@/helpers/cn.react.ts';


export type ArticleProps = React.HTMLAttributes<HTMLDivElement>;

const Article: React.FC<ArticleProps> = (props) => {
    const { className, ...other } = props;

    return (
        <article className={ cn(css.container, className) } { ...other }/>
    );
};

export default React.memo(Article);