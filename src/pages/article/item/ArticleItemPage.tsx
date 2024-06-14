import React, { lazy } from 'react';
import { ARTICLE_ID } from '@/constants/pages.ts';
import { useParams } from 'react-router-dom';


export type ArticleItemPageProps = {};

const ArticleContainer = lazy(() => import('@/containers/article/ArticleContainer/ArticleContainer.tsx').then((data) => ({
    default: data.ArticleContainer,
})));

const ArticleItemPage: React.FC<ArticleItemPageProps> = (props) => {
    const {}                           = props;
    const { [ARTICLE_ID]: articleKey } = useParams<{ [ARTICLE_ID]: string }>();

    return (
        <ArticleContainer articleKey={ articleKey! }/>
    );
};

export default React.memo(ArticleItemPage);