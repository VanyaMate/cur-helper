import React from 'react';
import { useSearchParams } from 'react-router-dom';
import TestPassingByIdContainer
    from '@/containers/test/TestPassingByIdContainer/TestPassingByIdContainer.tsx';


const TestPassingPage: React.FC = () => {
    const [ searchParams ] = useSearchParams();

    return (
        <TestPassingByIdContainer id={ searchParams.get('id') ?? '' }/>
    );
};

export default React.memo(TestPassingPage);