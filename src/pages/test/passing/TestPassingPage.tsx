import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TEST_ID } from '@/constants/pages.ts';
import { testPassingService } from '@/services/test-passing/test-passing.service.ts';
import { authService } from '@/services/auth/auth.service.ts';


const TestPassingByIdContainer
          = React.lazy(() => import('@/containers/test/TestPassingByIdContainer/TestPassingByIdContainer.tsx'));


const TestPassingPage: React.FC = () => {
    const { testId } = useParams<{ [TEST_ID]: string }>();

    useEffect(() => {
        if (testId) {
            testPassingService.getById(authService.token[0], testId);
        }
    }, [ testId ]);

    return (
        <TestPassingByIdContainer id={ testId ?? '' }/>
    );
};

export default React.memo(TestPassingPage);