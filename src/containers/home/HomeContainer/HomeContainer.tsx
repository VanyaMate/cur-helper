import React, { useEffect, useState } from 'react';
import ArticlePreview
    from '@/components/common/ArticlePreview/ArticlePreview.tsx';
import TileBox from '@/components/ui/container/TileBox/TileBox.tsx';
import { DomainNews } from '@vanyamate/cur-helper-types/types/news/DomainNews';
import { API_HOST } from '@/constants/api.url.ts';
import Loader from '@/components/common/Loader/Loader.tsx';
import {
    format,
} from 'date-fns';
import { ru } from 'date-fns/locale';


export type HomeContainerProps = {};

const HomeContainer: React.FC<HomeContainerProps> = (props) => {
    const {}                      = props;
    const [ news, setNews ]       = useState<DomainNews[]>([]);
    const [ pending, setPending ] = useState<boolean>(false);

    useEffect(() => {
        setPending(true);
        fetch(`${ API_HOST }/api/v1/news/list?limit=50`, { method: 'GET' })
            .then((response) => response.json())
            .then((news) => setNews(news))
            .finally(() => setPending(false));
    }, []);

    if (pending) {
        return <Loader/>;
    }

    return (
        <TileBox>
            {
                news.map((news) => (
                    <ArticlePreview
                        date={ format(news.date, 'PPP', { locale: ru }) }
                        description={ news.description }
                        image={ news.preview }
                        key={ news.key }
                        title={ news.title }
                        type="Новость"
                        url={ `/article/${ news.key }` }
                    />
                ))
            }
        </TileBox>
    );
};

export default React.memo(HomeContainer);