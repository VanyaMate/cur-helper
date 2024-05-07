import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TEST_ID } from '@/constants/pages.ts';
import {
    testPassingService,
} from '@/services/test-passing/test-passing.service.ts';
import { authService } from '@/services/auth/auth.service.ts';
import { observer } from 'mobx-react-lite';


const TestResultByIdContainer
          = React.lazy(() => import('@/containers/test/TestResultByIdContainer/TestResultByIdContainer.tsx'));


export type TestResultPageProps = {}

const TestResultPage: React.FC<TestResultPageProps> = observer((props) => {
    const {} = props;
    const { testId } = useParams<{ [TEST_ID]: string }>();

    // get results
    useEffect(() => {
        if (testId) {
            testPassingService.getResultById(authService.token[0], testId);
        }
    }, [ testId ]);

    return (
        <TestResultByIdContainer id={ testId ?? '' }/>
    );
});

export default React.memo(TestResultPage);