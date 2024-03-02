import React, { useMemo } from 'react';
import { useTestPassingQuestionHash } from '@/hooks/test/useTestPassingQuestionHash.ts';
import {
    useTestPassingQuestionPageController,
} from '@/hooks/test/useTestPassingQuestionPageController.ts';
import { useTestCurrentQuestion } from '@/hooks/test/useTestCurrentQuestion.ts';
import { useTestCompletedQuestions } from '@/hooks/test/useTestCompletedQuestions.ts';
import {
    useWindowPopupController,
} from '@/hooks/ui/popup/WindowPopup/useWindowPopupController.ts';
import { useNavigate } from 'react-router-dom';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';
import WindowPopup from '@/components/ui/popup/WindowPopup/WindowPopup.tsx';
import Section from '@/components/ui/container/Section/Section.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import SpaceBetween from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import P from '@/components/ui/p/P/P.tsx';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import TestPassingProgress
    from '@/components/common/test/TestPassingProgress/TestPassingProgress.tsx';
import TestQuestionPassing
    from '@/components/common/test/TestQuestionPassing/TestQuestionPassing.tsx';
import { testPassingService } from '@/services/test-passing/test-passing.service.ts';
import { authService } from '@/services/auth/auth.service.ts';
import Timer from '@/components/common/Timer/Timer.tsx';
import { observer } from 'mobx-react-lite';
import {
    QuestionSelect,
    QuestionType,
    TestPassingFullType,
    With,
} from '@vanyamate/cur-helper-types';
import { QuestionAnswers } from '@vanyamate/cur-helper-types/types/question';


export type TestPassingContainerProps = {
    test: TestPassingFullType;
};

const TestPassingContainer: React.FC<TestPassingContainerProps> = observer((props) => {
    const { test }                                                                 = props;
    const hash                                                                     = useTestPassingQuestionHash(test?.questions.length ?? 0);
    const {
              next, set, prev,
          }                                                                        = useTestPassingQuestionPageController(test, hash);
    const currentQuestion: With<QuestionType, [ QuestionSelect, QuestionAnswers ]> = useTestCurrentQuestion(test, hash.current - 1);
    const completedAmount                                                          = useTestCompletedQuestions(test.questions ?? []);
    const completed                                                                = useMemo(() => completedAmount === test.questions.length, [ test, completedAmount ]);
    const popupQuestionListModal                                                   = useWindowPopupController();
    const popupFinishModal                                                         = useWindowPopupController();
    const navigate                                                                 = useNavigate();
    const pageGetter                                                               = usePageUrl();

    return (
        <>
            <WindowPopup controller={ popupQuestionListModal }>
                <Section size="medium">
                    <Section size="extra-small">
                        <Title>{ test.id }</Title>
                        <SpaceBetween>
                            <P type="invisible">Завершено { completedAmount }/{ test.questions.length }</P>
                            <P type="second">Осталось { test.remainingTime }</P>
                        </SpaceBetween>
                    </Section>
                    <OrderedList
                        list={
                            test.questions.map((question: With<QuestionType, [ QuestionSelect, QuestionAnswers ]>, index: number) => (
                                <Button
                                    block
                                    key={ question.title }
                                    onClick={ () => {
                                        popupQuestionListModal.close();
                                        set(index + 1);
                                    } }
                                    styleType={ question.selectId !== null
                                                ? 'hover'
                                                : 'default' }
                                >{ question.title }</Button>
                            ))
                        }
                        title="Вопросы"
                    />
                </Section>
            </WindowPopup>
            <WindowPopup controller={ popupFinishModal }>
                <Section size="medium">
                    <Section size="extra-small">
                        <Title>Закончить тест?</Title>
                        <P type="invisible">
                            Вы завершили { completedAmount }/{ test.questions.length }
                        </P>
                    </Section>
                    <SpaceBetween>
                        <Button
                            onClick={ popupFinishModal.close }
                            prefix={ <IconM>arrow_back</IconM> }
                        >Отмена</Button>
                        <Button
                            onClick={ () => {
                                testPassingService.finish(authService.token[0], test.id)
                                    .then((result) => {
                                        navigate(pageGetter.testResult(result.id));
                                    });
                            } }
                            postfix={ <IconM>arrow_forward</IconM> }
                            styleType={ completed ? 'main' : 'danger' }
                        >Закончить</Button>
                    </SpaceBetween>
                </Section>
            </WindowPopup>
            <Section size="large" tag="section">
                <Section size="extra-small">
                    <SpaceBetween>
                        <TestPassingProgress
                            answers={ hash.current - 1 }
                            questions={ test.questions.length }
                        />
                        <Button
                            onClick={ popupQuestionListModal.open }
                            quad
                        >
                            <IconM>menu</IconM>
                        </Button>
                    </SpaceBetween>
                    <SpaceBetween>
                        <P type="invisible">Завершено { completedAmount }/{ test.questions.length }</P>
                        <P type="second">Осталось <Timer ms={ test.remainingTime }/></P>
                    </SpaceBetween>
                </Section>
                <Section size="extra-small">
                    {
                        currentQuestion ? <TestQuestionPassing
                            onSelect={ async (answerId) => testPassingService.setAnswer(authService.token[0], test.id, currentQuestion.id, answerId) }
                            question={ currentQuestion }
                        /> : null
                    }
                </Section>
                <SpaceBetween>
                    <Button
                        disabled={ (hash.current === 1 || completed) }
                        onClick={ prev }
                        prefix={ <IconM>arrow_back</IconM> }
                        styleType="simple"
                    >
                        Назад
                    </Button>
                    <Button
                        onClick={ (completed || test.questions.length === hash.current)
                                  ? popupFinishModal.open : next }
                        postfix={ <IconM>arrow_forward</IconM> }
                        styleType={
                            (completed || (((currentQuestion && currentQuestion.selectId !== null) && (test.questions.length !== hash.current))))
                            ? 'hover' : test.questions.length === hash.current
                                        ? 'danger' : 'simple'
                        }
                    >
                        {
                            (test.questions.length === hash.current || completed)
                            ? 'Закончить'
                            : 'Вперед'
                        }
                    </Button>
                </SpaceBetween>
            </Section>
        </>
    );
});

export default React.memo(TestPassingContainer);