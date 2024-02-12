import React, { useMemo } from 'react';
import css from './TestResultAnswer.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';
import Button from '@/components/ui/button/Button/Button.tsx';


export type TestResultAnswerProps = {
    answer: any;
    result: any;
    onClick?: (id: string) => any;
}

const TestResultAnswer: React.FC<TestResultAnswerProps> = (props) => {
    const {
              answer, result, onClick,
          } = props;

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
            className={ cn(
                css.container,
            ) }
            onClick={ clickHandler }
            styleType={
                result === 'error' ? 'danger' :
                result === 'selected' ? 'selected' :
                result === 'right' ? 'main' : 'default'
            }>
            { answer.body }
        </Button>
    );
};

export default React.memo(TestResultAnswer);