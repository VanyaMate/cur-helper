import React from 'react';
import css from './Footnote.module.scss';
import P from '@/components/ui/p/P/P.tsx';
import { cn } from '@vanyamate/helpers/react/classname';
import Section from '@/components/ui/container/box/Section.tsx';


export type FootnoteType =
    'notify' | 'warning' | 'urgent';

export type FootnoteProps = {
    header: React.ReactNode | string;
    body: React.ReactNode | string;
    type: FootnoteType;
}

const Footnote: React.FC<FootnoteProps> = (props) => {
    const { type, body, header } = props;

    return (
        <Section item={ 'second' } size={ 'small' } className={ cn(
            css.container,
            type === 'warning' && css.warning,
            type === 'urgent' && css.urgent,
            (type === 'notify' || !type) && css.notify,
        ) }>
            <h6 className={ css.header }>{ header }</h6>
            <P className={ css.body }>{ body }</P>
        </Section>
    );
};

export default React.memo(Footnote);