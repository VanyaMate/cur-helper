import React from 'react';
import css from './TestPassingProgress.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';
import P from '@/components/ui/p/P/P.tsx';
import { useMathPercent } from '@/hooks/math/useMathPercent.ts';


export type TestPassingProgressProps = {
    questions: number;
    answers: number;
}

const TestPassingProgress: React.FC<TestPassingProgressProps> = (props) => {
    const { questions, answers } = props;
    const percent                = useMathPercent(answers, questions);

    return (
        <div className={ cn(css.container, percent > 50 && css.halfFilled) }>
            <div className={ css.filled } style={ { width: `${ percent }%` } }>
                <div>
                    <P item={ 'second' }>вопрос</P>
                    <P>{ answers + 1 } из { questions }</P>
                </div>
            </div>
            <div className={ css.text } style={ { width: `${ 100 - percent }%` } }>
                <div>
                    <P item={ 'second' }>вопрос</P>
                    <P>{ answers + 1 } из { questions }</P>
                </div>
            </div>
        </div>
    );
};

export default React.memo(TestPassingProgress);