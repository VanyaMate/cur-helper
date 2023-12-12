import React, { useMemo } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import css from './TestResultProgressbar.module.scss';
import 'react-circular-progressbar/dist/styles.css';
import { cn } from '@vanyamate/helpers/react/classname';
import { TestResult } from '@/hooks/test/useFetchTestMockData.ts';


export type TestResultProps = {
    children: React.ReactNode | string;
}

const TestResultProgressbar: React.FC<TestResultProps> = (props) => {
    const {
              children,
          } = props;

    return (
        <div className={ css.container }>
            { children }
        </div>
    );
};

export default React.memo(TestResultProgressbar);