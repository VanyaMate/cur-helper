import React from 'react';
import { TestAnswer, TestQuestionResult } from '@/hooks/test/useTestResultMockData.ts';
import css from './TestResultAnswer.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';
import Button from '@/components/ui/button/Button/Button.tsx';


export type TestResultAnswerProps = {
    answer: TestAnswer;
    result: TestQuestionResult;
    onClick?: (answer: TestAnswer) => any;
}

const TestResultAnswer: React.FC<TestResultAnswerProps> = (props) => {
    const {
              answer, result, onClick,
          } = props;

    return (
        <Button
            block
            styleType={
                result === 'error' ? 'danger' :
                result === 'selected' ? 'selected' :
                result === 'right' ? 'main' : 'default'
            }
            className={ cn(
                css.container,
                onClick && css.clickable,
            ) }>
            { answer.body }
        </Button>
    );
};

export default React.memo(TestResultAnswer);