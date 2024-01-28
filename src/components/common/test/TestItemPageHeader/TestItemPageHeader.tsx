import React from 'react';
import Title from '@/components/ui/title/Title/Title.tsx';
import Section from '@/components/ui/container/Section/Section.tsx';
import css from './TestItemPageHeader.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';
import { useTestStatusLabel } from '@/hooks/test/useTestStatusLabel.ts';
import P from '@/components/ui/p/P/P.tsx';
import { useDateDeltaWithPostfix } from '@/hooks/date/useDateDeltaWithPostfix.ts';
import SpaceBetween from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import { TestResult } from '@/types/test/test.types.ts';


export type TestItemPageHeaderProps = {
    title: string;
    status: TestResult;
    date: string | number | Date;
    extra?: React.ReactNode | string;
}

const TestItemPageHeader: React.FC<TestItemPageHeaderProps> = (props) => {
    const {
              title,
              status,
              date,
              extra,
          } = props;

    const label     = useTestStatusLabel(status);
    const deltaDate = useDateDeltaWithPostfix(date, Date.now());

    return (
        <Section
            size={ 'medium' }
            type={ 'section' }
            className={
                cn(
                    css.container,
                    status === 'not-started' && css.not_started,
                    status === 'unsatisfactory' && css.unsatisfactory,
                    status === 'satisfactorily' && css.satisfactory,
                    status === 'perfect' && css.perfect,
                )
            }>
            <Section size={ 'small' }>
                <SpaceBetween>
                    <div>
                        <P type={ 'p' } item={ 'invisible' }>Тест на тему</P>
                        <Title>{ title }</Title>
                    </div>
                    { extra }
                </SpaceBetween>
            </Section>
            <SpaceBetween type={ 'footer' } className={ css.footer }>
                <span className={ css.status }>{ label }</span>
                {
                    (status !== 'not-started') &&
                    <P type={ 'span' } item={ 'invisible' }>{ deltaDate }</P>
                }
            </SpaceBetween>
        </Section>
    );
};

export default TestItemPageHeader;