import { useEffect, useMemo, useState } from 'react';


export type TestStatus =
    'not-started' | 'process' | 'finish';

export type TestQuestionResult =
    'error' | 'right' | 'selected' | 'empty';

export type TestAnswer = {
    id: string;
    body: string;
}

export type TestQuestion = {
    title: string;
    description: string;
    answerId: string;
    themeId: string;
    result: TestQuestionResult;
    answers: TestAnswer[];
}

export type TestTheme = {
    id: string;
    title: string;
    addition: string;
}

export type TestResult =
    'not-started' | 'unsatisfactory' | 'satisfactorily' | 'perfect';

export type Test = {
    id: string;
    title: string;
    description: string;
    startTime: string;
    finishTime: string;
    try: number;
    result: TestResult;
    status: TestStatus;
    questions: TestQuestion[];
    themes: TestTheme[];
}

export type FetchTest = {
    loading: boolean;
    test: Test | null;
}

export const useFetchTestMockData = function (id: string): FetchTest {
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ test, setTest ]       = useState<Test | null>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!id) {
                setLoading(false);
                return;
            }

            const test: Test = {
                id         : '1-1',
                title      : 'Законы и нормы права в управлении персоналом',
                description: 'Тест направленный на проверку знаний о законах и их применении',
                startTime  : new Date(Date.now() - 60000 * 27).toISOString(),
                finishTime : new Date(Date.now() - 60000 * 15).toISOString(),
                result     : 'satisfactorily',
                status     : 'finish',
                try        : 1,
                questions  : [
                    {
                        title      : 'Правильно ли ответил?',
                        description: `Дан текст: "Тест направленный на проверку знаний о законах и их применении", где ошибка?`,
                        answerId   : '1',
                        themeId    : '1-1',
                        result     : 'error',
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
                        themeId    : '1-1',
                        result     : 'error',
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
                        themeId    : '1-2',
                        result     : 'right',
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
                        themeId    : '1-3',
                        result     : 'right',
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
                        themeId    : '1-3',
                        result     : 'right',
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
                themes     : [
                    {
                        id      : '1-1',
                        title   : 'Закон №1.43 Чрезмерная милота',
                        addition: '',
                    },
                    {
                        id      : '1-2',
                        title   : 'Закон №72.00.1 Ведение групп',
                        addition: 'Обновление за 2023 год',
                    },
                    {
                        id      : '1-3',
                        title   : 'Закон №32.17 Представление о порядке',
                        addition: '',
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