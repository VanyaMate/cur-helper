import React from 'react';
import Title from '@/components/ui/title/Title/Title.tsx';
import Section from '@/components/ui/container/Section/Section.tsx';
import css from './TestItemPageHeader.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';
import SpaceBetween
    from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import P from '@/components/ui/p/P/P.tsx';


export type TestItemPageHeaderProps = {
    title: string;
    publicId: string;
    extra?: React.ReactNode | string;
}

const TestItemPageHeader: React.FC<TestItemPageHeaderProps> = (props) => {
    const {
              title,
              extra,
              publicId,
          } = props;

    return (
        <Section
            className={
                cn(css.container)
            }
            size="medium"
            tag="section">
            <Section size="small">
                <SpaceBetween>
                    <div>
                        <P type="invisible">{ publicId.replace(/-/g, '.') } Тест
                            на
                            тему</P>
                        <Title>{ title }</Title>
                    </div>
                    { extra }
                </SpaceBetween>
            </Section>
        </Section>
    );
};

export default React.memo(TestItemPageHeader);