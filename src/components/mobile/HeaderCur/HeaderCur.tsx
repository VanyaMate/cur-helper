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
        <Section className={ css.container } item="main" type="section">
            <img
                className={ css.logo }
                src="/cur-logo.png"
            />
            <Link to="#">{ region }</Link>
        </Section>
    );
};

export default React.memo(HeaderCur);