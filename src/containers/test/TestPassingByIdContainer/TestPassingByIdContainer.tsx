import React, { useMemo } from 'react';
import Button from '@/components/ui/button/Button/Button.tsx';
import {
    useTestPassingQuestionHash,
} from '@/hooks/test/useTestPassingQuestionHash.ts';
import SpaceBetween
    from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import Section from '@/components/ui/container/Section/Section.tsx';
import TestPassingProgress
    from '@/components/common/test/TestPassingProgress/TestPassingProgress.tsx';
import {
    useTestPassingQuestionPageController,
} from '@/hooks/test/useTestPassingQuestionPageController.ts';
import { useTestController } from '@/hooks/test/useTestController.ts';
import TestQuestionPassing
    from '@/components/common/test/TestQuestionPassing/TestQuestionPassing.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import P from '@/components/ui/p/P/P.tsx';
import { useTestCompletedQuestions } from '@/hooks/test/useTestCompletedQuestions.ts';
import WindowPopup from '@/components/ui/popup/WindowPopup/WindowPopup.tsx';
import {
    useWindowPopupController,
} from '@/hooks/ui/popup/WindowPopup/useWindowPopupController.ts';
import Title from '@/components/ui/title/Title/Title.tsx';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';
import { useNavigate } from 'react-router-dom';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';
import { useTestCurrentQuestion } from '@/hooks/test/useTestCurrentQuestion.ts';


export type TestPassingByIdContainerProps = {
    id: string;
}

const TestPassingByIdContainer: React.FC<TestPassingByIdContainerProps> = (props) => {
    const { id }                                     = props;
    const { loading, test, select, questionsAmount } = useTestController(id);
    const hash                                       = useTestPassingQuestionHash(test?.questions.length ?? 0);
    const {
              next, set, prev,
          }                                          = useTestPassingQuestionPageController(test, hash);
    const currentQuestion: any | null                = useTestCurrentQuestion(test, hash.current - 1);
    const completedAmount                            = useTestCompletedQuestions(test?.questions ?? []);
    const completed                                  = useMemo(() => completedAmount === questionsAmount, [ completedAmount, questionsAmount ]);
    const popupQuestionListModal                     = useWindowPopupController();
    const popupFinishModal                           = useWindowPopupController();
    const navigate                                   = useNavigate();
    const pageGetter                                 = usePageUrl();

    if (loading) {
        return 'loading..';
    }

    if (!currentQuestion || !test) {
        return 'no find';
    }

    return (
        <>
            <WindowPopup controller={ popupQuestionListModal }>
                <Section size="medium" type="div">
                    <Section size="extra-small" type="div">
                        <Title>{ test.title }</Title>
                        <SpaceBetween>
                            <P item="invisible">Завершено { completedAmount }/{ questionsAmount }</P>
                            <P item="second">Осталось 15:23</P>
                        </SpaceBetween>
                    </Section>
                    <OrderedList
                        list={
                            test.questions.map((question: any, index: number) => (
                                <Button
                                    block
                                    key={ question.title }
                                    onClick={ () => {
                                        popupQuestionListModal.close();
                                        set(index + 1);
                                    } }
                                    styleType={ question.result.result !== 'empty'
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
                        <P item="invisible">Вы завершили 1/5</P>
                    </Section>
                    <SpaceBetween type="div">
                        <Button
                            onClick={ popupFinishModal.close }
                            prefix={ <IconM>arrow_back</IconM> }
                        >Отмена</Button>
                        <Button
                            onClick={ () => {
                                navigate(pageGetter.testResult(id));
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
                            questions={ questionsAmount }
                        />
                        <Button
                            onClick={ popupQuestionListModal.open }
                            quad
                        >
                            <IconM>menu</IconM>
                        </Button>
                    </SpaceBetween>
                    <SpaceBetween>
                        <P item="invisible">Завершено { completedAmount }/{ questionsAmount }</P>
                        <P item="second">Осталось 15:23</P>
                    </SpaceBetween>
                </Section>
                <Section size="extra-small" type="div">
                    <TestQuestionPassing
                        onSelect={ async (answerId) => select(currentQuestion.id, answerId) }
                        question={ currentQuestion }
                    />
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
                        onClick={ (completed || questionsAmount === hash.current)
                                  ? popupFinishModal.open : next }
                        postfix={ <IconM>arrow_forward</IconM> }
                        styleType={ (completed || (currentQuestion.result.result !== 'empty' && questionsAmount !== hash.current))
                                    ? 'hover' : questionsAmount === hash.current
                                                ? 'danger' : 'simple' }
                    >
                        { (questionsAmount === hash.current || completed) ? 'Закончить'
                                                                          : 'Вперед' }
                    </Button>
                </SpaceBetween>
            </Section>
        </>
    );
};

export default React.memo(TestPassingByIdContainer);