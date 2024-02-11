import { TEST_ID } from '@/constants/pages.ts';
import TestItemContainer from '@/containers/test/TestItemContainer/TestItemContainer.tsx';
import React from 'react';
import { useParams } from 'react-router-dom';


export type TestItemPageProps = {}

const TestItemPage: React.FC<TestItemPageProps> = (props) => {
    const {}         = props;
    const { testId } = useParams<{ [TEST_ID]: string }>();

    return <TestItemContainer id={ testId! }/>;
};

export default React.memo(TestItemPage);