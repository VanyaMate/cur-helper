import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Section from '@/components/ui/container/box/Section.tsx';
import TestResult from '@/components/common/test/TestResult/TestResult.tsx';
import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb.tsx';
import TestItemPageHeader
    from '@/components/common/test/TestItemPageHeader/TestItemPageHeader.tsx';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';
import ListTitledItemWithUrl
    from '@/components/ui/list/ListTitledItemWithUrl/ListTitledItemWithUrl.tsx';
import Collapse from '@/components/ui/collapse/Collapse/Collapse.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import WindowPopup from '@/components/ui/popup/WindowPopup/WindowPopup.tsx';
import { useWindowPopupController } from '@/hooks/ui/popup/WindowPopup/useWindowPopupController.ts';
import TestBriefing from '@/components/common/test/TestBriefing/TestBriefing.tsx';


export type TestItemPageProps = {}

const TestItemPage: React.FC<TestItemPageProps> = (props) => {
    const {}                  = props;
    const { themeId, testId } = useParams<{ themeId: string, testId: string }>();
    const popupController     = useWindowPopupController();
    const navigate            = useNavigate();
    const themes              = useMemo(() => {
        return [
            {
                title      : 'Закон №1.43 Чрезмерная милота',
                addition   : '',
                description: '',
                url        : '/guid/1/1',
            },
            {
                title      : 'Закон №22.11 Пользовательское соглашение',
                addition   : '',
                description: '',
                url        : '/guid/1/1',
            },
            {
                title      : 'Закон №72.00.1 Ведение групп',
                addition   : 'Обновление за 2023 год',
                description: '',
                url        : '/guid/1/1',
            },
            {
                title      : 'Закон №32.17 Представление о порядке',
                addition   : '',
                description: '',
                url        : '/guid/1/1',
            },
        ];
    }, []);

    return (
        <Section size={ 'small' }>
            <WindowPopup controller={ popupController }>
                <TestBriefing
                    title={ 'Законы и нормы права в управлении персоналом' }
                    description={ 'Тест направленный на проверку знаний о законах и их применении' }
                    onStart={ async () => {
                        return new Promise(() => {
                            setTimeout(() => {
                                navigate('/test/pass?id=' + Math.random());
                            }, 1000);
                        });
                    } }
                    onClose={ popupController.close }
                    themes={ [ ...themes, ...themes ] }
                    timeToPass={ 10 }
                />
            </WindowPopup>
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
                extra={
                    <Button styleType={ 'main' } onClick={ popupController.open }>Начать</Button>
                }
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
                    list={ themes.map((theme) => (
                        <ListTitledItemWithUrl
                            title={ theme.title }
                            body={ theme.addition }
                            url={ theme.url }
                        />
                    )) }
                />
            </Collapse>
            <Collapse
                title={ 'Темы затронутые в тесте' }
            >
                <OrderedList
                    list={ [ ...themes, ...themes ].map((theme) => (
                        <ListTitledItemWithUrl
                            title={ theme.title }
                            body={ theme.addition }
                            url={ theme.url }
                        />
                    )) }
                />
            </Collapse>
        </Section>
    );
};

export default React.memo(TestItemPage);