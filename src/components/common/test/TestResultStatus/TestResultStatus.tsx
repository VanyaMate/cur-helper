import React from 'react';
import {
    TestPassingResult,
} from '@/types/test-passing/test-passing.types.ts';
import { useTestStatusLabel } from '@/hooks/test/useTestStatusLabel.ts';
import css from './TestResultStatus.module.scss';
import { cn } from '@vanyamate/helpers/react/classname.ts';
import P from '@/components/ui/p/P/P.tsx';


export type TestResultStatusProps = {
    result: TestPassingResult | null | undefined;
};

const TestResultStatus: React.FC<TestResultStatusProps> = (props) => {
    const { result } = props;
    const label      = useTestStatusLabel(result);

    return (
        <P
            className={
                cn(
                    css.container,
                    result === 'no-result' && css.not_started,
                    result === 'unsatis' && css.unsatisfactory,
                    result === 'satis' && css.satisfactory,
                    result === 'perfect' && css.perfect,
                )
            }
            item="second"
            type="span">
            { label }
        </P>
    );
};

export default React.memo(TestResultStatus);