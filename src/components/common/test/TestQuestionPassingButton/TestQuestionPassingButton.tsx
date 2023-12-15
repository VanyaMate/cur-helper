import React, { useCallback, useState } from 'react';
import { TestAnswer } from '@/types/test/test.types.ts';
import Button from '@/components/ui/button/Button/Button.tsx';
import css from './TestQuestionPassingButton.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';


export type TestQuestionPassingButtonProps = {
    answer: TestAnswer;
    selectedAnswer: boolean;
    selected: boolean;
    process: boolean;
    onSelect: (id: string) => any;
    onClick: (id: string) => any;
}

const TestQuestionPassingButton: React.FC<TestQuestionPassingButtonProps> = (props) => {
    const { answer, onSelect, selected, onClick, selectedAnswer, process } = props;

    const onMainClick = useCallback(() => {
        if (!process) {
            onClick(answer.id);
        }
    }, [ onClick ]);

    const onAcceptClick = useCallback(() => {
        if (process) return;
        onSelect(answer.id);
    }, [ onSelect, answer, process ]);

    return (
        <div className={ cn(css.container, selected && css.selected) }>
            <Button
                className={ css.accept }
                quad
                onClick={ onAcceptClick }
                styleType={ 'hover' }
                disabled={ process && !selected }
            >
                {
                    (process && selected)
                    ? <span className={ cn(
                        'material-symbols-outlined',
                        'loading',
                    ) }>sync</span>
                    : <span className="material-symbols-outlined">done</span>
                }
            </Button>
            <Button
                block
                styleType={ selectedAnswer ? 'selected' : 'default' }
                onClick={ onMainClick }
                disabled={ process && !selected }
            >{ answer.body }</Button>
        </div>
    );
};

export default React.memo(TestQuestionPassingButton);