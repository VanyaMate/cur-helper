import React from 'react';
import { useParams } from 'react-router-dom';
import TestPassingByIdContainer
    from '@/containers/test/TestPassingByIdContainer/TestPassingByIdContainer.tsx';
import { TEST_ID } from '@/constants/pages.ts';


const TestPassingPage: React.FC = () => {
    const { testId } = useParams<{ [TEST_ID]: string }>();

    return (
        <TestPassingByIdContainer id={ testId ?? '0' }/>
    );
};

export default React.memo(TestPassingPage);