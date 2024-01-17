import React from 'react';


export type ArticleItemPageProps = {};

const ArticleItemPage: React.FC<ArticleItemPageProps> = (props) => {
    const {} = props;

    return (
        <div>
            ArticleItemPageComponent
        </div>
    );
};

export default React.memo(ArticleItemPage);