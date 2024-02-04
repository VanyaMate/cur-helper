import React, { useMemo } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { cn } from '@vanyamate/helpers/react/classname.ts';
import css from './TestResultProgressbarCircle.module.scss';
import { TestResult } from '@/types/test/test.types.ts';
import 'react-circular-progressbar/dist/styles.css';


export type TestResultProgressbarCircleProps = {
    percent: number;
    result: TestResult;
}

const TestResultProgressbarCircle: React.FC<TestResultProgressbarCircleProps> = (props) => {
    const { percent, result } = props;

    const styles = useMemo(() => {
        if (result === 'perfect') {
            return buildStyles({
                textColor : '#ffde4b',
                pathColor : '#ffde4b',
                trailColor: '#31343a',
            });
        } else if (result === 'unsatisfactory') {
            return buildStyles({
                textColor : '#ef8484',
                pathColor : '#ef8484',
                trailColor: '#31343a',
            });
        } else if (result === 'satisfactorily') {
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
    }, [ result ]);

    return (
        <CircularProgressbar
            className={ cn(
                css.container,
                result === 'perfect' && css.perfect,
                result === 'satisfactorily' && css.satis,
                result === 'unsatisfactory' && css.unsatis,
            ) }
            strokeWidth={ 4 }
            styles={ styles }
            text={ `${ percent }%` }
            value={ percent }
        />
    );
};

export default React.memo(TestResultProgressbarCircle);