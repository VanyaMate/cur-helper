import React from 'react';
import { useParams } from 'react-router-dom';
import { TEST_ID } from '@/constants/pages.ts';


const TestResultByIdContainer
          = React.lazy(() => import('@/containers/test/TestResultByIdContainer/TestResultByIdContainer.tsx'));


export type TestResultPageProps = {}

const TestResultPage: React.FC<TestResultPageProps> = (props) => {
    const {}         = props;
    const { testId } = useParams<{ [TEST_ID]: string }>();

    return (
        <TestResultByIdContainer id={ testId ?? '' }/>
    );
};

export default React.memo(TestResultPage);