import React, { useMemo } from 'react';
import { TestStatus } from '@/components/common/test/TestItemLink/TestItemLink.tsx';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import css from './TestResult.module.scss';
import 'react-circular-progressbar/dist/styles.css';
import { useTestStatusLabel } from '@/hooks/test/useTestStatusLabel.ts';
import { cn } from '@vanyamate/helpers/react/classname';


export type TestResultProps = {
    questions: number;
    rightAnswers?: number;
    trying?: number;
    time?: number;
    status: TestStatus;
}

const TestResult: React.FC<TestResultProps> = (props) => {
    const {
              questions,
              rightAnswers,
              status,
              time,
              trying,
          }       = props;
    const percent = useMemo(() => {
        return rightAnswers ? Math.floor(100 / questions * rightAnswers) : 0;
    }, [ questions, rightAnswers ]);

    const label = useTestStatusLabel(status);

    const styles = useMemo(() => {
        if (status === 'perfect') {
            return buildStyles({
                textColor : '#ffde4b',
                pathColor : '#ffde4b',
                trailColor: '#31343a',
            });
        } else if (status === 'unsatisfactory') {
            return buildStyles({
                textColor : '#ef8484',
                pathColor : '#ef8484',
                trailColor: '#31343a',
            });
        } else if (status === 'satisfactorily') {
            return buildStyles({
                textColor : '#84a0ef',
                pathColor : '#84a0ef',
                trailColor: '#31343a',
            });
        } else {
            return buildStyles({
                textColor : '#6a7585',
                pathColor : '#6a7585',
                trailColor: '#31343a',
            });
        }
    }, [ status ]);

    return (
        <div className={ css.container }>
            <CircularProgressbar
                className={ cn(
                    css.progress,
                    status === 'perfect' && css.perfect,
                    status === 'satisfactorily' && css.satis,
                    status === 'unsatisfactory' && css.unsatis,
                ) }
                text={ `${ percent }%` }
                value={ percent }
                strokeWidth={ 4 }
                styles={ styles }
            />
            <div className={ css.info }>
                <div className={ css.row }>
                    <span className={ css.label }>Вопросов:</span>
                    <span className={ css.value }>{ questions }</span>
                </div>
                <div className={ css.row }>
                    <span className={ css.label }>Правильных ответов:</span>
                    <span className={ css.value }>{ rightAnswers ?? '-' }</span>
                </div>
                <div className={ css.row }>
                    <span className={ css.label }>Попытки:</span>
                    <span className={ css.value }>{ trying ?? '-' }</span>
                </div>
                <div className={ css.row }>
                    <span className={ css.label }>Время:</span>
                    <span className={ css.value }>{ time ? `${ time } минут` : '-' }</span>
                </div>
            </div>
        </div>
    );
};

export default React.memo(TestResult);