import React, { useEffect } from 'react';
import { testsService } from '@/services/tests/tests.service.ts';
import { authService } from '@/services/auth/auth.service.ts';


const TestListContainer = React.lazy(() => import('@/containers/test/TestListContainer/TestListContainer.tsx'));


export type TestPageProps = {}

const TestListPage: React.FC<TestPageProps> = (props) => {
    const {} = props;

    useEffect(() => {
        testsService.getTestListByThemeId('', authService.token[0]);
    }, []);

    return <TestListContainer/>;
};

export default React.memo(TestListPage);