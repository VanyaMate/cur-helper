import { TEST_ID } from '@/constants/pages.ts';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { testsService } from '@/services/tests/tests.service.ts';
import { authService } from '@/services/auth/auth.service.ts';
import { observer } from 'mobx-react-lite';


const TestItemContainer = React.lazy(() => import('@/containers/test/TestItemContainer/TestItemContainer.tsx'));


export type TestItemPageProps = {}

const TestItemPage: React.FC<TestItemPageProps> = observer((props) => {
    const {}         = props;
    const { testId } = useParams<{ [TEST_ID]: string }>();

    useEffect(() => {
        if (testId) {
            testsService.getOneTestByIds(testId, authService.token[0]);
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ testId, authService.token[0] ]);

    return (
        <TestItemContainer id={ testId! }/>
    );
});

export default React.memo(TestItemPage);