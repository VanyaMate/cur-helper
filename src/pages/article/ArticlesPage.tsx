import React from 'react';


export type ArticlePageProps = {};

const ArticlesPage: React.FC<ArticlePageProps> = (props) => {
    const {} = props;

    return (
        <div>
            ArticlesPageComponent
        </div>
    );
};

export default React.memo(ArticlesPage);