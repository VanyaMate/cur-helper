import React from 'react';


export type TestPassingButtonProps = {
    testId: string;
};

const TestPassingButton: React.FC<TestPassingButtonProps> = (props) => {
    const { testId } = props;
    // if loggined
    // -- show button passing
    // else
    // -- show login form

    return (
        <div>
            TestPassingButtonComponent { testId }
        </div>
    );
};

export default React.memo(TestPassingButton);