import { TEST_ID } from '@/constants/pages.ts';
import TestItemContainer from '@/containers/test/TestItemContainer/TestItemContainer.tsx';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { testsService } from '@/services/tests/tests.service.ts';
import { authService } from '@/services/auth/auth.service.ts';


export type TestItemPageProps = {}

const TestItemPage: React.FC<TestItemPageProps> = (props) => {
    const {}         = props;
    const { testId } = useParams<{ [TEST_ID]: string }>();

    useEffect(() => {
        if (testId) {
            testsService.getOneTestByIds(testId, authService.token[0]);
        }
    }, [ testId ]);

    return <TestItemContainer id={ testId! }/>;
};

export default React.memo(TestItemPage);