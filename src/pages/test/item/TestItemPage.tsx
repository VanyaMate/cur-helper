import React from 'react';
import { useParams } from 'react-router-dom';
import Section from '@/components/ui/container/box/Section.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import TestResult from '@/components/common/test/TestResult/TestResult.tsx';
import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb.tsx';
import TestItemPageHeader
    from '@/components/common/test/TestItemPageHeader/TestItemPageHeader.tsx';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';
import Link from '@/components/ui/link/Link/Link.tsx';
import TestMistake from '@/components/common/test/TestMistake/TestMistake.tsx';


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
                        { label: 'Общие правила', url: '/test/1' },
                    ]
                }
            />
            <TestItemPageHeader
                title={ `Законы` }
                status={ 'unsatisfactory' }
                date={ '12 дней назад' }
            />
            <Section
                item
            >
                <TestResult
                    questions={ 22 }
                    rightAnswers={ 7 }
                    time={ 10 }
                    trying={ 1 }
                    status={ 'unsatisfactory' }
                />
            </Section>
            <OrderedList
                title={ 'Что нужно повторить' }
                list={ [
                    <TestMistake
                        title={ 'Закон №1.43 Чрезмерная милота' }
                        url={ '#' }
                    />,
                    <TestMistake
                        title={ 'Закон №22.11 Пользовательское соглашение' }
                        url={ '#' }
                    />,
                    <TestMistake
                        title={ 'Закон №72.00.1 Ведение групп' }
                        body={ 'Обновление за 2023 год' }
                        url={ '#' }
                    />,
                    <TestMistake
                        title={ 'Закон №32.17 Представление о порядке' }
                        url={ '#' }
                    />,
                ] }
            />
        </Section>
    );
};

export default React.memo(TestItemPage);