import React from 'react';


export type TestPageProps = {}

const TestPage: React.FC<TestPageProps> = (props) => {
    const {} = props;

    return (
        <div>
            TestPage component
        </div>
    );
};

export default React.memo(TestPage);