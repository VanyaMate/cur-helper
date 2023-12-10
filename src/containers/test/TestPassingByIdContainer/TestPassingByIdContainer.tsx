import React, { useEffect, useState } from 'react';
import { Test, useFetchTest } from '@/hooks/test/useFetchTest.ts';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';


export type TestPassingByIdContainerProps = {
    id: string;
}

const TestPassingByIdContainer: React.FC<TestPassingByIdContainerProps> = (props) => {
    const { id }            = props;
    const { loading, test } = useFetchTest(id);

    if (loading) {
        return 'loading...';
    }

    if (!test) {
        return 'not found';
    }

    return (
        <OrderedList
            title={ `Тест: ${ test.title }` }
            list={ [
                <p>описание: { test.description }</p>,
                <p>вопросов: { test.questions.length }</p>,
                <p>статус: { test.status }</p>,
                <p>начало: { test.startTime }</p>,
                <p>конец: { test.finishTime }</p>,
            ] }
        >
        </OrderedList>
    );
};

export default React.memo(TestPassingByIdContainer);