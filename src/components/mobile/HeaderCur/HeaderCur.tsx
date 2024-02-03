import React from 'react';
import Section from '@/components/ui/container/Section/Section.tsx';
import Link from '@/components/ui/link/Link/Link.tsx';
import css from './HeaderCur.module.scss';


export type HeaderCurProps = {
    region: string;
    link: string;
};

const HeaderCur: React.FC<HeaderCurProps> = (props) => {
    const { region, link } = props;

    return (
        <Section type={ 'section' } item={ 'main' } className={ css.container }>
            <img
                src={ '/cur-logo.png' }
                className={ css.logo }
            />
            <Link to={ link }>{ region }</Link>
        </Section>
    );
};

export default HeaderCur;