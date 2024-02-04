import React, { useCallback } from 'react';
import { TestAnswer } from '@/types/test/test.types.ts';
import Button from '@/components/ui/button/Button/Button.tsx';


export type TestQuestionPassingButtonProps = {
    answer: TestAnswer;
    selectedAnswer: boolean;
    selected: boolean;
    process: boolean;
    onSelect: (id: string) => any;
}

const TestQuestionPassingButton: React.FC<TestQuestionPassingButtonProps> = (props) => {
    const {
              answer, onSelect, selected, selectedAnswer, process,
          } = props;

    const onAcceptClick = useCallback(() => {
        if (process) return;
        onSelect(answer.id);
    }, [ onSelect, answer, process ]);

    return (
        <Button
            block
            disabled={ process ? !selected : null }
            onClick={ onAcceptClick }
            styleType={ selectedAnswer ? 'selected' : selected ? 'hover'
                                                               : 'default' }
        >
            { answer.body }
        </Button>
    );
};

export default React.memo(TestQuestionPassingButton);