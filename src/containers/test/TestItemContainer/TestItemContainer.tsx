import React from 'react';
import Section from '@/components/ui/container/Section/Section.tsx';
import WindowPopup from '@/components/ui/popup/WindowPopup/WindowPopup.tsx';
import TestBriefing
    from '@/components/common/test/TestBriefing/TestBriefing.tsx';
import TestItemPageHeader
    from '@/components/common/test/TestItemPageHeader/TestItemPageHeader.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import SpaceBetween
    from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import TestResultProgressbarCircle
    from '@/components/common/test/TestResultProgressbarCircle/TestResultProgressbarCircle.tsx';
import AdditionalList
    from '@/components/ui/container/AdditionalList/AdditionalList.tsx';
import Collapse from '@/components/ui/collapse/Collapse/Collapse.tsx';
import {
    useWindowPopupController,
} from '@/hooks/ui/popup/WindowPopup/useWindowPopupController.ts';
import { useNavigate } from 'react-router-dom';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';
import TestResultPreview
    from '@/components/common/test/TestResultPreview/TestResultPreview.tsx';
import {
    useDateDeltaWithPostfix,
} from '@/hooks/date/useDateDeltaWithPostfix.ts';
import ThemeListItem
    from '@/components/common/theme/ThemeListItem/ThemeListItem.tsx';
import { testsService } from '@/services/tests/tests.service.ts';
import { observer } from 'mobx-react-lite';
import {
    testPassingService,
} from '@/services/test-passing/test-passing.service.ts';
import { authService } from '@/services/auth/auth.service.ts';
import P from '@/components/ui/p/P/P.tsx';
import FetchShow from '@/components/common/FetchShow/FetchShow.tsx';
import { useUserData } from '@/hooks/user/useUserData.ts';
import {
    UserAuthForm,
} from '@/widgets/user/form/UserAuthForm/UserAuthForm.tsx';


export type TestItemContainerProps = {
    id: string;
};

const TestItemContainer: React.FC<TestItemContainerProps> = observer((props) => {
    const { id }             = props;
    const fetch              = testsService.tests[id];
    const startTestPopup     = useWindowPopupController();
    const authUserPopup      = useWindowPopupController();
    const navigate           = useNavigate();
    const pageGetter         = usePageUrl();
    const timeToPass: string = useDateDeltaWithPostfix(Date.now() - (fetch?.data?.timeToPass ?? 0), Date.now(), '');
    // TODO: Может быть как-то это сделать по другому
    const data               = fetch?.data;
    const { data: userData } = useUserData();

    return (
        <FetchShow fetch={ fetch }>
            {
                data
                ? <Section size="small">
                    <WindowPopup controller={ startTestPopup }>
                        <TestBriefing
                            description={ data.description }
                            onClose={ startTestPopup.close }
                            onStart={ async () => {
                                return new Promise(() => {
                                    testPassingService.start(authService.token[0], data.id)
                                        .then((testPassing) =>
                                            navigate(pageGetter.testPassing(testPassing.id)),
                                        );
                                });
                            } }
                            status={ data.shortResult?.status }
                            themes={ data.themes }
                            timeToPass={ timeToPass }
                            title={ data.title }
                        />
                    </WindowPopup>
                    <WindowPopup controller={ authUserPopup }>
                        <UserAuthForm onFinish={ () => {
                            authUserPopup.close();
                            startTestPopup.open();
                        } }/>
                    </WindowPopup>
                    <TestItemPageHeader
                        extra={
                            !userData?.id
                            ? <Button
                                onClick={ authUserPopup.open }
                                styleType={ 'main' }>Пройти</Button>
                            : <Button onClick={ startTestPopup.open }
                                      styleType="main">
                                {
                                    data.shortResult?.status === 'process'
                                    ? 'Продолжить' : 'Начать'
                                }
                            </Button>
                        }
                        publicId={ data.theme.publicId }
                        title={ data.title }
                    />
                    <Section size="extra-small">
                        <TestResultPreview shortResult={ data.shortResult }/>
                        <Section type="main">
                            <SpaceBetween size="small">
                                <TestResultProgressbarCircle
                                    percent={
                                        data.shortResult?.rightAnswers
                                        ? 100 / data.shortResult.questionsAmount * Math.max(data.shortResult.rightAnswers, 0)
                                        : 0
                                    }
                                    result={ data.shortResult?.result }
                                />
                                <AdditionalList
                                    list={ [
                                        {
                                            label: 'Вопросов',
                                            value: data.questionsAmount,
                                        },
                                        {
                                            label: 'Правильных ответов',
                                            value: data.shortResult?.rightAnswers === -1
                                                   ? '-'
                                                   : data.shortResult?.rightAnswers ?? '-',
                                        },
                                        { label: 'Попыток', value: '-' },
                                        { label: 'Время', value: timeToPass },
                                    ] }
                                />
                            </SpaceBetween>
                        </Section>
                    </Section>
                    <Section size="large">
                        <P dangerouslySetInnerHTML={ { __html: data.description } }
                           type="second"/>
                        <Collapse
                            opened
                            title="Что нужно повторить"
                        >
                            <Section size="extra-small">
                                { data.themes.map((theme) => (
                                    <ThemeListItem
                                        key={ theme.publicId }
                                        theme={ theme }
                                        urlGenerator={ pageGetter.guid }
                                    />
                                )) }
                            </Section>
                        </Collapse>
                        <Collapse
                            title="Темы затронутые в тесте"
                        >
                            <Section size="extra-small">
                                { data.themes.map((theme) => (
                                    <ThemeListItem
                                        key={ theme.publicId }
                                        theme={ theme }
                                        urlGenerator={ pageGetter.guid }
                                    />
                                )) }
                            </Section>
                        </Collapse>
                    </Section>
                </Section>
                : null
            }
        </FetchShow>
    );
});

export default React.memo(TestItemContainer);