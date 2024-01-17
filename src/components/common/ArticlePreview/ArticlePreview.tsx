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
    const { image, title, url, description, date, type } = props;

    return (
        <Section
            type={ 'article' }
            item={ 'main' }
            className={ css.container }
            size={ 'extra-small' }
        >
            <div
                style={ { backgroundImage: `url(${ image })` } }
                className={ css.image }
            />
            <SpaceBetween>
                {
                    type &&
                    <P item={ 'invisible' }>{ type }</P>
                }
                <P item={ 'invisible' }>{ date }</P>
            </SpaceBetween>
            <Title
                className={ css.title }
                size={ 'small' }
                lines={ 3 }
            >{ title }</Title>
            {
                description &&
                <P
                    className={ css.description }
                    item={ 'invisible' }
                    lines={ 5 }
                >{ description }</P>
            }
        </Section>
    );
};

export default React.memo(ArticlePreview);