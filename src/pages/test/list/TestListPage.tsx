import React, { useEffect } from 'react';
import TestListContainer from '@/containers/test/TestListContainer/TestListContainer.tsx';
import { testsService } from '@/services/tests/tests.service.ts';
import { authService } from '@/services/auth/auth.service.ts';


export type TestPageProps = {}

const TestListPage: React.FC<TestPageProps> = (props) => {
    const {} = props;

    useEffect(() => {
        testsService.getTestListByThemeId('', authService.token[0]);
    }, []);

    return <TestListContainer/>;
};

export default React.memo(TestListPage);