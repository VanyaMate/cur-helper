import React from 'react';
import Section from '@/components/ui/container/Section/Section.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import Link from '@/components/ui/link/Link/Link.tsx';
import P from '@/components/ui/p/P/P.tsx';
import css from './ListTitledItemWithUrl.module.scss';


export type ListTitledItemWithUrlProps = {
    title?: React.ReactNode;
    body?: React.ReactNode;
    url?: string;
}

const ListTitledItemWithUrl: React.FC<ListTitledItemWithUrlProps> = (props) => {
    const { title, body, url } = props;

    return (
        <Section
            className={ css.container }
            item
            size="extra-small"
            type="article"
        >
            {
                title ? <Title className={ css.title } size="small">{ title }</Title>
                      : null
            }
            {
                body ? <P className={ css.body } item="invisible">{ body }</P> : null
            }
            {
                url ? <Link className={ css.link } target="_blank" to={ url }>
                    ссылка на материалы
                </Link> : null
            }
        </Section>
    );
};

export default React.memo(ListTitledItemWithUrl);