import React from 'react';
import { useFetchTestItem } from '@/hooks/test/fetch/useFetchTestItem.ts';
import Section from '@/components/ui/container/Section/Section.tsx';
import WindowPopup from '@/components/ui/popup/WindowPopup/WindowPopup.tsx';
import TestBriefing from '@/components/common/test/TestBriefing/TestBriefing.tsx';
import TestItemPageHeader
    from '@/components/common/test/TestItemPageHeader/TestItemPageHeader.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import SpaceBetween from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import TestResultProgressbarCircle
    from '@/components/common/test/TestResultProgressbarCircle/TestResultProgressbarCircle.tsx';
import AdditionalList from '@/components/ui/container/AdditionalList/AdditionalList.tsx';
import Collapse from '@/components/ui/collapse/Collapse/Collapse.tsx';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';
import ListTitledItemWithUrl
    from '@/components/ui/list/ListTitledItemWithUrl/ListTitledItemWithUrl.tsx';
import {
    useWindowPopupController,
} from '@/hooks/ui/popup/WindowPopup/useWindowPopupController.ts';
import { useNavigate } from 'react-router-dom';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';
import TestResultPreview
    from '@/components/common/test/TestResultPreview/TestResultPreview.tsx';
import { useDateDeltaWithPostfix } from '@/hooks/date/useDateDeltaWithPostfix.ts';
import ThemeListItem from '@/components/common/theme/ThemeListItem/ThemeListItem.tsx';


export type TestItemContainerProps = {
    id: string;
};

const TestItemContainer: React.FC<TestItemContainerProps> = (props) => {
    const { id }                   = props;
    const { data, loading, error } = useFetchTestItem(id);
    const popupController          = useWindowPopupController();
    const navigate                 = useNavigate();
    const pageGetter               = usePageUrl();
    const timeToPass: string       = useDateDeltaWithPostfix(Date.now() - (data?.timeToPass ?? 0), Date.now(), '');

    if (loading) {
        return 'loading..';
    }

    if (error) {
        return 'Error';
    }

    if (!data) {
        return 'Not found';
    }

    return (
        <Section size="small">
            <WindowPopup controller={ popupController }>
                <TestBriefing
                    description={ data.description }
                    onClose={ popupController.close }
                    onStart={ async () => {
                        return new Promise(() => {
                            setTimeout(() => {
                                navigate(pageGetter.testPassing(Math.random().toString()));
                            }, 1000);
                        });
                    } }
                    themes={ data.themes }
                    timeToPass={ timeToPass }
                    title={ data.title }
                />
            </WindowPopup>
            <TestItemPageHeader
                extra={
                    <Button onClick={ popupController.open }
                            styleType="main">Начать</Button>
                }
                title={ data.title }
            />
            <TestResultPreview shortResult={ data.shortResult }/>
            <Section item="main">
                <SpaceBetween size="small" type="div">
                    <TestResultProgressbarCircle
                        percent={ data.shortResult?.rightAnswers
                                  ? 100 / data.shortResult.questions.length * data.shortResult.rightAnswers
                                  : 0 }
                        result={ data.shortResult?.result }
                    />
                    <AdditionalList
                        list={ [
                            { label: 'Вопросов', value: data.questionsAmount },
                            {
                                label: 'Правильных ответов',
                                value: data.shortResult?.rightAnswers ?? '-',
                            },
                            { label: 'Попыток', value: '-' },
                            { label: 'Время', value: timeToPass },
                        ] }
                    />
                </SpaceBetween>
            </Section>
            <Collapse
                opened
                title="Что нужно повторить"
            >
                <OrderedList
                    list={ data.themes.map((theme) => (
                        <ThemeListItem
                            key={ theme.publicId }
                            theme={ theme }
                        />
                    )) }
                />
            </Collapse>
            <Collapse
                title="Темы затронутые в тесте"
            >
                <OrderedList
                    list={ data.themes.map((theme) => (
                        <ThemeListItem
                            key={ theme.publicId }
                            theme={ theme }
                        />
                    )) }
                />
            </Collapse>
        </Section>
    );
};

export default React.memo(TestItemContainer);