import React from 'react';
import { ThemeShortType } from '@vanyamate/cur-helper-types';
import Title from '@/components/ui/title/Title/Title.tsx';
import P from '@/components/ui/p/P/P.tsx';
import Section from '@/components/ui/container/Section/Section.tsx';


export type ThemePreviewItemProps = {
    theme: ThemeShortType;
    extra?: React.ReactNode;
};

const ThemePreviewItem: React.FC<ThemePreviewItemProps> = (props) => {
    const { theme, extra } = props;

    return (
        <Section
            key={ theme.publicId }
            size="extra-small"
            tag="article"
            type="main"
        >
            { extra }
            <Title lines={ 1 } size="small">{ theme.title }</Title>
            <P
                dangerouslySetInnerHTML={ { __html: theme.description } }
                lines={ 2 }
                type="invisible"
            />
        </Section>
    );
};

export default React.memo(ThemePreviewItem);