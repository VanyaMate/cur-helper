import React from 'react';
import { useSearchParams } from 'react-router-dom';
import TestResultByIdContainer
    from '@/containers/test/TestPassingByIdContainer/TestPassingByIdContainer.tsx';


export type TestResultPageProps = {}

const TestResultPage: React.FC<TestResultPageProps> = (props) => {
    const {}               = props;
    const [ searchParams ] = useSearchParams();

    return (
        <TestResultByIdContainer id={ searchParams.get('id') ?? '' }/>
    );
};

export default React.memo(TestResultPage);