import React from 'react';
import TestListContainer from '@/containers/test/TestListContainer/TestListContainer.tsx';


export type TestPageProps = {}

const TestPage: React.FC<TestPageProps> = (props) => {
    const {} = props;
    return <TestListContainer/>;
};

export default React.memo(TestPage);