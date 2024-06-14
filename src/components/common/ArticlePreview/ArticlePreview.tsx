import React from 'react';
import Section from '@/components/ui/container/Section/Section.tsx';
import P from '@/components/ui/p/P/P.tsx';
import css from './ArticlePreview.module.scss';
import SpaceBetween
    from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import { Link } from 'react-router-dom';
import Title from '@/components/ui/title/Title/Title.tsx';


export type ArticlePreviewProps = {
    image: string;
    title: string;
    url: string;
    date: string;
    type?: string;
    description?: string;
};

const ArticlePreview: React.FC<ArticlePreviewProps> = (props) => {
    const { image, title, description, date, type, url } = props;

    return (
        <Section
            className={ css.container }
            size="extra-small"
            tag="article"
            type="main"
        >
            <Link className={ css.link } to={ `${ url }` }>
                <div
                    className={ css.image }
                    onClick={ () => console.log(url) }
                    style={ { backgroundImage: `url(${ image })` } }
                />
                <SpaceBetween>
                    {
                        type ? <P type="invisible">{ type }</P> : null
                    }
                    <P type="invisible">{ date }</P>
                </SpaceBetween>
                <Title
                    className={ css.title }
                    lines={ 3 }
                    size="small"
                >{ title }</Title>
                {
                    description ? <P
                        className={ css.description }
                        lines={ 2 }
                        type="invisible"
                    >{ description }</P> : null
                }
            </Link>
        </Section>
    );
};

export default React.memo(ArticlePreview);