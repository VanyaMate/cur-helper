import React from 'react';
import Section from '@/components/ui/container/Section/Section.tsx';
import Link from '@/components/ui/link/Link/Link.tsx';
import css from './HeaderCur.module.scss';


export type HeaderCurProps = {
    region: string;
};

const HeaderCur: React.FC<HeaderCurProps> = (props) => {
    const { region } = props;

    return (
        <Section type={ 'section' } item={ 'main' } className={ css.container }>
            <img
                src={ '/cur-logo.png' }
                className={ css.logo }
            />
            <Link to={ '#' }>{ region }</Link>
        </Section>
    );
};

export default React.memo(HeaderCur);