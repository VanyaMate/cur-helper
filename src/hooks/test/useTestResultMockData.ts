import { useEffect, useMemo, useState } from 'react';
import { Test, TestUser, TestUserResult } from '@/types/test/test.types.ts';
import { User } from '@/types/user/user.types.ts';


export type FetchTestResult = {
    loading: boolean;
    test: TestUserResult | null;
}

export const useTestResultMockData = function (id: string): FetchTestResult {
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ test, setTest ]       = useState<TestUserResult | null>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!id) {
                setLoading(false);
                return;
            }

            const user: User                     = {
                id   : '1',
                login: 'VanyaMate',
                info : {},
            };
            const test: TestUser                 = {
                id         : '1-1',
                title      : 'Законы и нормы права в управлении персоналом',
                description: 'Тест направленный на проверку знаний о законах и их применении',
                questions  : [
                    {
                        id         : '1',
                        title      : 'Правильно ли ответил?',
                        description: `Дан текст: "Тест направленный на проверку знаний о законах и их применении", где ошибка?`,
                        result     : {
                            answerId: '3',
                            result  : 'error',
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
                        title      : 'Правильно ли ответил?',
                        description: `Дан текст: "Тест направленный на проверку знаний о законах и их применении", где ошибка?`,
                        result     : {
                            answerId: '1',
                            result  : 'right',
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
                        title      : 'Правильно ли ответил?',
                        description: `Дан текст: "Тест направленный на проверку знаний о законах и их применении", где ошибка?`,
                        result     : {
                            answerId: '1',
                            result  : 'error',
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
                        title      : 'Правильно ли ответил?',
                        description: `Дан текст: "Тест направленный на проверку знаний о законах и их применении", где ошибка?`,
                        result     : {
                            answerId: '2',
                            result  : 'right',
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
                        title      : 'Правильно ли ответил?',
                        description: `Дан текст: "Тест направленный на проверку знаний о законах и их применении", где ошибка?`,
                        result     : {
                            answerId: '3',
                            result  : 'right',
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
            const testUserResult: TestUserResult = {
                startTime : new Date(Date.now() - 60000 * 27).toISOString(),
                finishTime: new Date(Date.now() - 60000 * 15).toISOString(),
                result    : 'satisfactorily',
                status    : 'finish',
                try       : 1,
                test      : test,
                user      : user,
            };

            setTest(testUserResult);
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timeout);
    }, [ id ]);

    return useMemo(() => ({
        loading, test,
    }), [ loading, test ]);
};