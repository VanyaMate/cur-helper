import { Fetch, FetchData, FetchError } from '@/hooks/useFetch.ts';
import { Test } from '@/types/test/test.types.ts';
import { useEffect, useMemo, useState } from 'react';


export const useFetchTestPassingMockData = function (id: string): Fetch<Test> {
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error ]               = useState<FetchError>(null);
    const [ test, setTest ]       = useState<FetchData<Test>>(null);

    useEffect(() => {
        setLoading(true);
        const timeout = setTimeout(() => {
            if (!id) {
                setLoading(false);
                return;
            }

            const test: Test = {
                id         : '1-1',
                title      : 'Законы и нормы права в управлении персоналом',
                description: 'Тест направленный на проверку знаний о законах и их применении',
                questions  : [
                    {
                        id         : '1',
                        title      : 'Правильно ли ответил? 1',
                        description: `Дан текст: "Тест направленный на проверку знаний о законах и их применении", где ошибка?`,
                        result     : {
                            answerId: '1',
                            result  : 'selected',
                        },
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
                    },
                    {
                        id         : '2',
                        title      : 'Правильно ли ответил? 2',
                        description: `Дан текст: "Тест направленный на проверку знаний о законах и их применении", где ошибка?`,
                        result     : {
                            answerId: '3',
                            result  : 'selected',
                        },
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
                        themes     : [
                            {
                                id      : '1-2',
                                title   : 'Закон №72.00.1 Ведение групп',
                                addition: 'Обновление за 2023 год',
                            },
                        ],
                    },
                    {
                        id         : '3',
                        title      : 'Правильно ли ответил? 3',
                        description: `Дан текст: "Тест направленный на проверку знаний о законах и их применении", где ошибка?`,
                        result     : {
                            answerId: '',
                            result  : 'empty',
                        },
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
                        themes     : [
                            {
                                id      : '1-1',
                                title   : 'Закон №1.43 Чрезмерная милота',
                                addition: '',
                            },
                        ],
                    },
                    {
                        id         : '4',
                        title      : 'Правильно ли ответил? 4',
                        description: `Дан текст: "Тест направленный на проверку знаний о законах и их применении", где ошибка?`,
                        result     : {
                            answerId: '',
                            result  : 'empty',
                        },
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
                        themes     : [
                            {
                                id      : '1-3',
                                title   : 'Закон №32.17 Представление о порядке',
                                addition: '',
                            },
                        ],
                    },
                    {
                        id         : '5',
                        title      : 'Правильно ли ответил? 5',
                        description: `Дан текст: "Тест направленный на проверку знаний о законах и их применении", где ошибка?`,
                        result     : {
                            answerId: '',
                            result  : 'empty',
                        },
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
                        themes     : [
                            {
                                id      : '1-1',
                                title   : 'Закон №1.43 Чрезмерная милота',
                                addition: '',
                            },
                        ],
                    },
                ],
            };

            setTest(test);
            setLoading(false);
        }, 100);

        return () => clearTimeout(timeout);
    }, [ id ]);

    return useMemo(() => ({
        loading, data: test, error,
    }), [ loading, error, test ]);
};