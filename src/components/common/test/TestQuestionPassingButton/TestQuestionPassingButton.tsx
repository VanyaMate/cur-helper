import React, { useCallback } from 'react';
import Button from '@/components/ui/button/Button/Button.tsx';
import { QuestionAnswerType } from '@vanyamate/cur-helper-types';


export type TestQuestionPassingButtonProps = {
    answer: QuestionAnswerType;
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
            disabled={ process ? !selected : undefined }
            onClick={ onAcceptClick }
            styleType={ selectedAnswer ? 'selected' : selected ? 'hover'
                                                               : 'default' }
        >
            { answer.title }
        </Button>
    );
};

export default React.memo(TestQuestionPassingButton);