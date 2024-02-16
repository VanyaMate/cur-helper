import React, { useMemo } from 'react';
import { TestPassingFullType } from '@/services/test-passing/test-passing.types.ts';
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
import { With } from '@/types/types.ts';
import { QuestionSelect, QuestionType } from '@/types/question/question.types.ts';
import Timer from '@/components/common/Timer/Timer.tsx';
import { observer } from 'mobx-react-lite';


export type TestPassingContainerProps = {
    test: TestPassingFullType;
};

const TestPassingContainer: React.FC<TestPassingContainerProps> = observer((props) => {
    const { test } = props;
    console.log('test', test);
    const hash = useTestPassingQuestionHash(test?.questions.length ?? 0);
    console.log('hash', hash);
    const {
              next, set, prev,
          } = useTestPassingQuestionPageController(test, hash);
    console.log('hash', hash);
    const currentQuestion: With<QuestionType, [ QuestionSelect ]> = useTestCurrentQuestion(test, hash.current - 1);
    console.log('hash', hash);
    const completedAmount = useTestCompletedQuestions(test.questions ?? []);
    console.log('completedAmount', completedAmount);
    const completed = useMemo(() => completedAmount === test.questions.length, [ test, completedAmount ]);
    console.log('completed', completed);
    const popupQuestionListModal = useWindowPopupController();
    const popupFinishModal       = useWindowPopupController();
    const navigate               = useNavigate();
    const pageGetter             = usePageUrl();

    return (
        <>
            <WindowPopup controller={ popupQuestionListModal }>
                <Section size="medium" type="div">
                    <Section size="extra-small" type="div">
                        <Title>{ test.id }</Title>
                        <SpaceBetween>
                            <P item="invisible">Завершено { completedAmount }/{ test.questions.length }</P>
                            <P item="second">Осталось { test.remainingTime }</P>
                        </SpaceBetween>
                    </Section>
                    <OrderedList
                        list={
                            test.questions.map((question: With<QuestionType, [ QuestionSelect ]>, index: number) => (
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
                <Section size="medium" type="div">
                    <Section size="extra-small" type="div">
                        <Title>Закончить тест?</Title>
                        <P item="invisible">
                            Вы завершили { completedAmount }/{ test.questions.length }
                        </P>
                    </Section>
                    <SpaceBetween type="div">
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
            <Section size="large">
                <Section size="extra-small" type="div">
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
                        <P item="invisible">Завершено { completedAmount }/{ test.questions.length }</P>
                        <P item="second">Осталось <Timer ms={ test.remainingTime }/></P>
                    </SpaceBetween>
                </Section>
                <Section size="extra-small" type="div">
                    {
                        currentQuestion ? <TestQuestionPassing
                            onSelect={ async (answerId) => testPassingService.setAnswer(authService.token[0], test.id, currentQuestion.id, answerId) }
                            question={ currentQuestion }
                        /> : null
                    }
                </Section>
                <SpaceBetween type="div">
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