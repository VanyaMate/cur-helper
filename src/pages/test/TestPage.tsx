import React, { useCallback } from 'react';
import Section from '@/components/ui/container/box/Section.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import Input from '@/components/ui/input/Input/Input.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import { useInput } from '@/hooks/ui/input/useInput.ts';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';
import TestItemLink from '@/components/common/test/TestItemLink/TestItemLink.tsx';
import { useNavigate } from 'react-router-dom';


export type TestPageProps = {}

const TestPage: React.FC<TestPageProps> = (props) => {
    const {}                  = props;
    const [ value, onChange ] = useInput({
        initialValue: '',
        onChange    : (value) => console.log('value', value),
        debounce    : 500,
    });
    const navigate            = useNavigate();
    const navigateCallback    = useCallback((id: string) => {
        const [ themeId, testId ] = id.split('-');
        navigate(`/test/${ themeId }/${ testId }`);
    }, []);

    return (
        <Section size={ 'large' }>
            <Title size={ 'large' }>Тесты</Title>
            <aside style={ { display: 'flex', gap: 5 } }>
                <Input
                    style={ { width: '100%' } }
                    value={ value }
                    onChangeHandler={ onChange }
                    placeholder={ 'Поиск' }
                />
                <Button styleType={ 'main' }>Найти</Button>
            </aside>
            <OrderedList
                prefix={ '1' }
                title={ 'Общие правила' }
                list={ [
                    <TestItemLink
                        id={ '1-1' }
                        disabled={ false }
                        label={ 'Законы' }
                        onClick={ navigateCallback }
                        status={ 'satisfactorily' }
                        questions={ 17 }
                        rightAnswers={ 14 }
                    />,
                    <TestItemLink
                        id={ '1-2' }
                        disabled={ false }
                        label={ 'Правила' }
                        onClick={ navigateCallback }
                        status={ 'unsatisfactory' }
                        questions={ 16 }
                        rightAnswers={ 7 }
                    />,
                    <TestItemLink
                        id={ '1-3' }
                        disabled={ false }
                        label={ 'Этикет' }
                        onClick={ navigateCallback }
                        status={ 'perfect' }
                        questions={ 21 }
                        rightAnswers={ 21 }
                    />,
                ] }
            />
            <OrderedList
                prefix={ '2' }
                title={ 'Правила общения' }
                list={ [
                    <TestItemLink
                        id={ '2-1' }
                        disabled={ false }
                        label={ 'Вежливость' }
                        onClick={ navigateCallback }
                        status={ 'satisfactorily' }
                        questions={ 11 }
                        rightAnswers={ 7 }
                    />,
                    <TestItemLink
                        id={ '2-2' }
                        disabled={ false }
                        label={ 'Открытость' }
                        onClick={ navigateCallback }
                        status={ 'perfect' }
                        questions={ 13 }
                        rightAnswers={ 13 }
                    />,
                    <TestItemLink
                        id={ '2-3' }
                        disabled={ false }
                        label={ 'Конкретика' }
                        onClick={ navigateCallback }
                        status={ 'not-started' }
                        questions={ 27 }
                        rightAnswers={ 0 }
                    />,
                    <TestItemLink
                        id={ '2-4' }
                        disabled={ true }
                        label={ 'Обвинения' }
                        onClick={ navigateCallback }
                        status={ 'not-started' }
                        questions={ 13 }
                        rightAnswers={ 0 }
                    />,
                    <TestItemLink
                        id={ '2-5' }
                        disabled={ true }
                        label={ 'Вопросы' }
                        onClick={ navigateCallback }
                        status={ 'not-started' }
                        questions={ 14 }
                        rightAnswers={ 0 }
                    />,
                ] }
            />
        </Section>
    );
};

export default React.memo(TestPage);