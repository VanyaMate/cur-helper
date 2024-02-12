import React, { useCallback } from 'react';
import Button from '@/components/ui/button/Button/Button.tsx';


export type TestQuestionPassingButtonProps = {
    answer: any;
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
            { answer.body }
        </Button>
    );
};

export default React.memo(TestQuestionPassingButton);