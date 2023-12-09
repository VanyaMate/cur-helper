import React from 'react';
import { useParams } from 'react-router-dom';
import Section from '@/components/ui/container/box/Section.tsx';
import TestResult from '@/components/common/test/TestResult/TestResult.tsx';
import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb.tsx';
import TestItemPageHeader
    from '@/components/common/test/TestItemPageHeader/TestItemPageHeader.tsx';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';
import ListTitledItemWithUrl
    from '@/components/ui/list/ListTitledItemWithUrl/ListTitledItemWithUrl.tsx';
import Collapse from '@/components/ui/collapse/Collapse/Collapse.tsx';


export type TestItemPageProps = {}

const TestItemPage: React.FC<TestItemPageProps> = (props) => {
    const {}                  = props;
    const { themeId, testId } = useParams<{ themeId: string, testId: string }>();

    return (
        <Section size={ 'medium' }>
            <Breadcrumb
                items={
                    [
                        {
                            label: <span className="material-symbols-outlined">home</span>,
                            url  : '/test',
                        },
                        { label: 'Общие правила', url: `/test/${ themeId }` },
                    ]
                }
            />
            <TestItemPageHeader
                title={ `Законы` }
                status={ 'unsatisfactory' }
                date={ '12 дней назад' }
            />
            <Section item={ 'main' }>
                <TestResult
                    questions={ 22 }
                    rightAnswers={ 7 }
                    time={ 10 }
                    trying={ 1 }
                    status={ 'unsatisfactory' }
                />
            </Section>
            <Collapse
                title={ 'Что нужно повторить' }
                opened
            >
                <OrderedList
                    list={ [
                        <ListTitledItemWithUrl
                            title={ 'Закон №1.43 Чрезмерная милота' }
                            url={ '/guid/1/1' }
                        />,
                        <ListTitledItemWithUrl
                            title={ 'Закон №22.11 Пользовательское соглашение' }
                            url={ '/guid/1/1' }
                        />,
                        <ListTitledItemWithUrl
                            title={ 'Закон №72.00.1 Ведение групп' }
                            body={ 'Обновление за 2023 год' }
                            url={ '/guid/1/1' }
                        />,
                        <ListTitledItemWithUrl
                            title={ 'Закон №32.17 Представление о порядке' }
                            url={ '/guid/1/1' }
                        />,
                    ] }
                />
            </Collapse>
            <Collapse
                title={ 'Темы затронутые в тесте' }
            >
                <OrderedList
                    list={ [
                        <ListTitledItemWithUrl
                            title={ 'Закон №1.43 Чрезмерная милота' }
                            url={ '/guid/1/1' }
                        />,
                        <ListTitledItemWithUrl
                            title={ 'Закон №22.11 Пользовательское соглашение' }
                            url={ '/guid/1/1' }
                        />,
                        <ListTitledItemWithUrl
                            title={ 'Закон №72.00.1 Ведение групп' }
                            body={ 'Обновление за 2023 год' }
                            url={ '/guid/1/1' }
                        />,
                        <ListTitledItemWithUrl
                            title={ 'Закон №32.17 Представление о порядке' }
                            url={ '/guid/1/1' }
                        />,
                        <ListTitledItemWithUrl
                            title={ 'Закон №1.43 Чрезмерная милота' }
                            url={ '/guid/1/1' }
                        />,
                        <ListTitledItemWithUrl
                            title={ 'Закон №22.11 Пользовательское соглашение' }
                            url={ '/guid/1/1' }
                        />,
                        <ListTitledItemWithUrl
                            title={ 'Закон №72.00.1 Ведение групп' }
                            body={ 'Обновление за 2023 год' }
                            url={ '/guid/1/1' }
                        />,
                        <ListTitledItemWithUrl
                            title={ 'Закон №32.17 Представление о порядке' }
                            url={ '/guid/1/1' }
                        />,
                    ] }
                />
            </Collapse>
        </Section>
    );
};

export default React.memo(TestItemPage);