import React from 'react';
import Section from '@/components/ui/container/Section/Section.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import P from '@/components/ui/p/P/P.tsx';
import css from './ArticlePreview.module.scss';
import SpaceBetween from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';


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
            item="main"
            size="extra-small"
            type="article"
        >
            <div
                className={ css.image }
                onClick={ () => console.log(url) }
                style={ { backgroundImage: `url(${ image })` } }
            />
            <SpaceBetween>
                {
                    type ? <P item="invisible">{ type }</P> : null
                }
                <P item="invisible">{ date }</P>
            </SpaceBetween>
            <Title
                className={ css.title }
                lines={ 3 }
                size="small"
            >{ title }</Title>
            {
                description ? <P
                    className={ css.description }
                    item="invisible"
                    lines={ 5 }
                >{ description }</P> : null
            }
        </Section>
    );
};

export default React.memo(ArticlePreview);