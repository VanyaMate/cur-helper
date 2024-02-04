import React, { useCallback } from 'react';
import Section from '@/components/ui/container/Section/Section.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import Input from '@/components/ui/input/Input/Input.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import { useInput } from '@/hooks/ui/input/useInput.ts';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';
import TestItemLink from '@/components/common/test/TestItemLink/TestItemLink.tsx';
import { useNavigate } from 'react-router-dom';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';
import Collapse from '@/components/ui/collapse/Collapse/Collapse.tsx';
import P from '@/components/ui/p/P/P.tsx';


export type TestPageProps = {}

const TestPage: React.FC<TestPageProps> = (props) => {
    const {}                  = props;
    const [ value, onChange ] = useInput({
        initialValue: '',
        onChange    : (value) => console.log('value', value),
        debounce    : 500,
    });
    const navigate            = useNavigate();
    const pageGetter          = usePageUrl();
    const navigateCallback    = useCallback((id: string) => {
        navigate(pageGetter.test(id));
    }, [ pageGetter, navigate ]);

    return (
        <Section size="medium">
            <Section size="extra-small" type="div">
                <Title size="large">Тесты</Title>
                <P item="second">Пройдите тесты чтобы проверить свои знания</P>
            </Section>
            <aside style={ { display: 'flex', gap: 5 } }>
                <Input
                    onChangeHandler={ onChange }
                    placeholder="Поиск"
                    style={ { width: '100%' } }
                    value={ value }
                />
                <Button styleType="main">Найти</Button>
            </aside>
            <Collapse item="main" opened={ true } title="1. Общие правила">
                <OrderedList
                    list={ [
                        <TestItemLink
                            disabled={ false }
                            id="1-1"
                            key="1-1"
                            label="Законы"
                            onClick={ navigateCallback }
                            questions={ 17 }
                            rightAnswers={ 14 }
                            status="satisfactorily"
                        />,
                        <TestItemLink
                            disabled={ false }
                            id="1-2"
                            key="1-2"
                            label="Правила"
                            onClick={ navigateCallback }
                            questions={ 16 }
                            rightAnswers={ 7 }
                            status="unsatisfactory"
                        />,
                        <TestItemLink
                            disabled={ false }
                            id="1-3"
                            key="1-3"
                            label="Этикет"
                            onClick={ navigateCallback }
                            questions={ 21 }
                            rightAnswers={ 21 }
                            status="perfect"
                        />,
                    ] }
                    prefix="1"
                />
            </Collapse>
            <Collapse item="main" opened={ true } title="2. Правила общения">
                <OrderedList
                    list={ [
                        <TestItemLink
                            disabled={ false }
                            id="2-1"
                            key="2-1"
                            label="Вежливость"
                            onClick={ navigateCallback }
                            questions={ 11 }
                            rightAnswers={ 7 }
                            status="satisfactorily"
                        />,
                        <TestItemLink
                            disabled={ false }
                            id="2-2"
                            key="2-2"
                            label="Открытость"
                            onClick={ navigateCallback }
                            questions={ 13 }
                            rightAnswers={ 13 }
                            status="perfect"
                        />,
                        <TestItemLink
                            disabled={ false }
                            id="2-3"
                            key="2-3"
                            label="Конкретика"
                            onClick={ navigateCallback }
                            questions={ 27 }
                            rightAnswers={ 0 }
                            status="not-started"
                        />,
                        <TestItemLink
                            disabled={ true }
                            id="2-4"
                            key="2-4"
                            label="Обвинения"
                            onClick={ navigateCallback }
                            questions={ 13 }
                            rightAnswers={ 0 }
                            status="not-started"
                        />,
                        <TestItemLink
                            disabled={ true }
                            id="2-5"
                            key="2-5"
                            label="Вопросы"
                            onClick={ navigateCallback }
                            questions={ 14 }
                            rightAnswers={ 0 }
                            status="not-started"
                        />,
                    ] }
                    prefix="2"
                />
            </Collapse>
        </Section>
    );
};

export default React.memo(TestPage);