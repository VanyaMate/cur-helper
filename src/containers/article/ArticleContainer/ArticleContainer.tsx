import { ComponentPropsWithoutRef, FC, memo, useEffect, useState } from 'react';
import css from './ArticleContainer.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';
import {
    DomainNewsFull,
} from '@vanyamate/cur-helper-types/types/news/DomainNews';
import Loader from '@/components/common/Loader/Loader.tsx';
import { API_HOST } from '@/constants/api.url.ts';
import { isNotEmptyHtml } from '@/helpers/in-not-empty-html.helper.ts';
import P from '@/components/ui/p/P/P.tsx';
import {
    format,
} from 'date-fns';
import { ru } from 'date-fns/locale';


export type ArticleContainerProps =
    {
        articleKey: string;
    }
    & ComponentPropsWithoutRef<'section'>;

export const ArticleContainer: FC<ArticleContainerProps> = memo(function ArticleContainer (props) {
    const { className, articleKey, ...other } = props;
    const [ pending, setPending ]             = useState<boolean>(false);
    const [ article, setArticle ]             = useState<DomainNewsFull | null>(null);

    useEffect(() => {
        setPending(true);
        fetch(`${ API_HOST }/api/v1/news/${ articleKey }`, { method: 'GET' })
            .then((response) => response.json())
            .then((news) => setArticle(news))
            .finally(() => setPending(false));
    }, [ articleKey ]);

    if (pending) {
        return <Loader/>;
    }

    if (!article) {
        return '404';
    }

    return (
        <section
            { ...other }
            className={ cn(css.container, className) }
        >
            <header className={ css.header }>
                <div className={ css.info }>
                    <footer className={ css.footer }>
                        <time className={ css.date }
                              dateTime={ article.date }>{ format(article.date, 'PPP', { locale: ru }) }
                        </time>
                    </footer>
                    <img
                        alt={ article.title }
                        className={ css.preview }
                        src={ article.preview }
                    />
                    <h2 className={ css.title }>{ article.title }</h2>
                </div>
            </header>
            {
                isNotEmptyHtml(article.body)
                ? <P
                    className={ cn(css.body, 'tiptap') }
                    dangerouslySetInnerHTML={ { __html: article.body } }
                />
                : null
            }
        </section>
    );
});