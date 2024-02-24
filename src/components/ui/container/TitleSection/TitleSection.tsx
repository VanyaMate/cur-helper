import React from 'react';
import Section, { SectionProps } from '@/components/ui/container/Section/Section.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import SpaceBetween from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';


export type TitleSectionProps =
    {
        title: string;
        extra?: React.ReactNode;
    }
    & SectionProps;

const TitleSection: React.FC<TitleSectionProps> = (props) => {
    const { title, extra, children, type, ...other } = props;

    return (
        <Section { ...other } type={ type }>
            <Title size="small">
                <SpaceBetween type={ type !== 'main' ? 'main' : 'default' }>
                    { title }
                    { extra }
                </SpaceBetween>
            </Title>
            { children }
        </Section>
    );
};

export default React.memo(TitleSection);