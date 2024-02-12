import React, { useMemo } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { cn } from '@vanyamate/helpers/react/classname.ts';
import css from './TestResultProgressbarCircle.module.scss';
import 'react-circular-progressbar/dist/styles.css';
import { TestPassingResult } from '@/types/test-passing/test-passing.types.ts';


export type TestResultProgressbarCircleProps = {
    percent: number;
    result?: TestPassingResult;
}

const TestResultProgressbarCircle: React.FC<TestResultProgressbarCircleProps> = (props) => {
    const { percent, result } = props;

    const styles = useMemo(() => {
        if (result === 'perfect') {
            return buildStyles({
                textColor : '#FFDE4B',
                pathColor : '#FFDE4B',
                trailColor: '#31343A',
            });
        } else if (result === 'unsatis') {
            return buildStyles({
                textColor : '#EF8484',
                pathColor : '#EF8484',
                trailColor: '#31343A',
            });
        } else if (result === 'satis') {
            return buildStyles({
                textColor : '#84A0EF',
                pathColor : '#84A0EF',
                trailColor: '#31343A',
            });
        } else {
            return buildStyles({
                textColor : '#6A7585',
                pathColor : '#6A7585',
                trailColor: '#31343A',
            });
        }
    }, [ result ]);

    return (
        <CircularProgressbar
            className={ cn(
                css.container,
                result === 'perfect' && css.perfect,
                result === 'satis' && css.satis,
                result === 'unsatis' && css.unsatis,
            ) }
            strokeWidth={ 4 }
            styles={ styles }
            text={ `${ percent.toFixed(0) }%` }
            value={ percent }
        />
    );
};

export default React.memo(TestResultProgressbarCircle);