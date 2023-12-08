import React from 'react';
import Section from '@/components/ui/container/box/Section.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import Link from '@/components/ui/link/Link/Link.tsx';
import css from './TestMistake.module.scss';
import P from '@/components/ui/p/P/P.tsx';


export type TestMistakeProps = {
    title?: string;
    body?: string;
    url?: string;
}

const TestMistake: React.FC<TestMistakeProps> = (props) => {
    const { title, body, url } = props;

    return (
        <Section
            item
            type={ 'article' }
            className={ css.container }
        >
            {
                title &&
                <Title size={ 'small' } className={ css.title }>{ title }</Title>
            }
            {
                body &&
                <P className={ css.body }>{ body }</P>
            }
            {
                url &&
                <Link to={ url } target={ '_blank' } className={ css.link }>
                    ссылка на материалы
                </Link>
            }
        </Section>
    );
};

export default React.memo(TestMistake);