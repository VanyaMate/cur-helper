import React from 'react';
import { useSearchParams } from 'react-router-dom';
import TestPassingByIdContainer
    from '@/containers/test/TestPassingByIdContainer/TestPassingByIdContainer.tsx';


export type TestPassingPageProps = {}

const TestPassingPage: React.FC<TestPassingPageProps> = (props) => {
    const {}               = props;
    const [ searchParams ] = useSearchParams();

    return (
        <TestPassingByIdContainer id={ searchParams.get('id') ?? '' }/>
    );
};

export default React.memo(TestPassingPage);