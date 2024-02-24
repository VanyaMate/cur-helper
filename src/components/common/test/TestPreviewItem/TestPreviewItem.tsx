import React from 'react';
import Section from '@/components/ui/container/Section/Section.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import P from '@/components/ui/p/P/P.tsx';
import TestResultPreview from '../TestResultPreview/TestResultPreview';
import SpaceBetween from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import css from './TestPreviewItem.module.scss';
import { useStringEndingByNumber } from '@/hooks/string/useStringEndingByNumber.ts';
import { useDateDeltaWithPostfix } from '@/hooks/date/useDateDeltaWithPostfix.ts';
import { TestShortResult, TestType, With } from '@vanyamate/cur-helper-types';


export type TestPreviewItemProps = {
    test: With<TestType, [ TestShortResult ]>;
    onClick: (id: string) => any;
};

const TestPreviewItem: React.FC<TestPreviewItemProps> = (props) => {
    const { test, onClick }  = props;
    const questionsString    = useStringEndingByNumber(test.questionsAmount, {
        '1'    : 'вопрос',
        '2-4'  : 'вопроса',
        'other': 'вопросов',
    }, '');
    const timeToPass: string = useDateDeltaWithPostfix(Date.now() - test.timeToPass, Date.now(), '');

    return (
        <Section
            className={ css.container }
            onClick={ () => onClick(test.id) }
            size="extra-small"
            tag="article"
            type="main"
        >
            <Section size="extra-small">
                <TestResultPreview shortResult={ test.shortResult }/>
                <Title lines={ 2 }>{ test.title }</Title>
                <P dangerouslySetInnerHTML={ { __html: test.description } } lines={ 2 }/>
            </Section>
            <SpaceBetween>
                <P type="invisible">{ questionsString }</P>
                <P type="invisible">{ timeToPass }</P>
            </SpaceBetween>
        </Section>
    );
};

export default React.memo(TestPreviewItem);