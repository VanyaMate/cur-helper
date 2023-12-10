import { useEffect, useMemo, useState } from 'react';


export type TestStatus =
    'not-started' | 'process' | 'finish';

export type TestAnswerStatus =
    'error' | 'right';

export type TestAnswer = {
    id: string;
    body: string;
}

export type TestQuestion = {
    title: string;
    description: string;
    answerId: string;
    status: TestAnswerStatus;
    answers: TestAnswer[];
}

export type Test = {
    title: string;
    description: string;
    startTime: string;
    finishTime: string;
    status: TestStatus;
    questions: TestQuestion[];
}

export type FetchTest = {
    loading: boolean;
    test: Test | null;
}

export const useFetchTest = function (id: string): FetchTest {
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ test, setTest ]       = useState<Test | null>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!id) {
                setLoading(false);
                return;
            }

            const test: Test = {
                title      : 'Законы и нормы права в управлении персоналом',
                description: 'Тест направленный на проверку знаний о законах и их применении',
                startTime  : new Date(Date.now() - 1720000).toISOString(),
                finishTime : new Date(Date.now() - 1011233).toISOString(),
                status     : 'finish',
                questions  : [
                    {
                        title      : 'Правильно ли ответил?',
                        description: `Дан текст: "Тест направленный на проверку знаний о законах и их применении", где ошибка?`,
                        answerId   : '1',
                        status     : 'error',
                        answers    : [
                            {
                                id  : '1',
                                body: 'Тест направленный',
                            },
                            {
                                id  : '2',
                                body: 'Тест направленный',
                            },
                            {
                                id  : '3',
                                body: 'Тест направленный',
                            },
                        ],
                    },
                    {
                        title      : 'Правильно ли ответил?',
                        description: `Дан текст: "Тест направленный на проверку знаний о законах и их применении", где ошибка?`,
                        answerId   : '3',
                        status     : 'error',
                        answers    : [
                            {
                                id  : '1',
                                body: 'Тест направленный',
                            },
                            {
                                id  : '2',
                                body: 'Тест направленный',
                            },
                            {
                                id  : '3',
                                body: 'Тест направленный',
                            },
                        ],
                    },
                    {
                        title      : 'Правильно ли ответил?',
                        description: `Дан текст: "Тест направленный на проверку знаний о законах и их применении", где ошибка?`,
                        answerId   : '2',
                        status     : 'right',
                        answers    : [
                            {
                                id  : '1',
                                body: 'Тест направленный',
                            },
                            {
                                id  : '2',
                                body: 'Тест направленный',
                            },
                            {
                                id  : '3',
                                body: 'Тест направленный',
                            },
                        ],
                    },
                    {
                        title      : 'Правильно ли ответил?',
                        description: `Дан текст: "Тест направленный на проверку знаний о законах и их применении", где ошибка?`,
                        answerId   : '2',
                        status     : 'right',
                        answers    : [
                            {
                                id  : '1',
                                body: 'Тест направленный',
                            },
                            {
                                id  : '2',
                                body: 'Тест направленный',
                            },
                            {
                                id  : '3',
                                body: 'Тест направленный',
                            },
                        ],
                    },
                    {
                        title      : 'Правильно ли ответил?',
                        description: `Дан текст: "Тест направленный на проверку знаний о законах и их применении", где ошибка?`,
                        answerId   : '3',
                        status     : 'right',
                        answers    : [
                            {
                                id  : '1',
                                body: 'Тест направленный',
                            },
                            {
                                id  : '2',
                                body: 'Тест направленный',
                            },
                            {
                                id  : '3',
                                body: 'Тест направленный',
                            },
                        ],
                    },
                ],
            };

            setTest(test);
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timeout);
    }, [ id ]);

    return useMemo(() => ({
        loading, test,
    }), [ loading, test ]);
};