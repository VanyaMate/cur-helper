import React from 'react';
import { useSearchParams } from 'react-router-dom';


export type TestResultPageProps = {}

const TestResultPage: React.FC<TestResultPageProps> = (props) => {
    const {}               = props;
    const [ searchParams ] = useSearchParams();

    return (
        <div>
            TestResultPage component { searchParams.get('id') }
        </div>
    );
};

export default React.memo(TestResultPage);