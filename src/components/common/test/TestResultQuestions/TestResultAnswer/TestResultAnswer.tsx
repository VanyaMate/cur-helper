import React, { useMemo } from 'react';
import css from './TestResultAnswer.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';
import Button from '@/components/ui/button/Button/Button.tsx';
import { TestAnswer, TestQuestionResult } from '@/types/test/test.types.ts';


export type TestResultAnswerProps = {
    answer: TestAnswer;
    result: TestQuestionResult;
    onClick?: (id: string) => any;
}

const TestResultAnswer: React.FC<TestResultAnswerProps> = (props) => {
    const {
              answer, result, onClick,
          } = props;

    console.log('asnwer', answer, result);

    console.log('style type', result === 'error' ? 'danger' :
                              result === 'selected' ? 'selected' :
                              result === 'right' ? 'main' : 'default');

    const clickHandler = useMemo(() => {
        if (onClick) {
            return () => onClick(answer.id);
        } else {
            return undefined;
        }
    }, [ answer, onClick ]);

    return (
        <Button
            block
            styleType={
                result === 'error' ? 'danger' :
                result === 'selected' ? 'selected' :
                result === 'right' ? 'main' : 'default'
            }
            onClick={ clickHandler }
            className={ cn(
                css.container,
                onClick && css.clickable,
            ) }>
            { answer.body }
        </Button>
    );
};

export default React.memo(TestResultAnswer);