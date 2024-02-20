import React from 'react';
import { testPassingService } from '@/services/test-passing/test-passing.service.ts';
import Loader from '@/components/common/Loader/Loader.tsx';
import TestPassingContainer
    from '@/containers/test/TestPassingContainer/TestPassingContainer.tsx';
import { observer } from 'mobx-react-lite';
import { TestPassingFullType } from '@vanyamate/cur-helper-types';


export type TestPassingByIdContainerProps = {
    id: string;
}

const TestPassingByIdContainer: React.FC<TestPassingByIdContainerProps> = observer((props) => {
    const { id }                                = props;
    // load test passing
    const test: TestPassingFullType | undefined = testPassingService.passingTests.get(id);

    if (test) {
        return <TestPassingContainer test={ test }/>;
    } else {
        return <Loader/>;
    }
});

export default React.memo(TestPassingByIdContainer);