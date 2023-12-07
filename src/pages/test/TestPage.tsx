import React from 'react';
import Section from '@/components/ui/container/box/Section.tsx';
import SectionTitle from '@/components/ui/title/Title/Title.tsx';
import Input from '@/components/ui/input/Input/Input.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import { useInput } from '@/hooks/ui/input/useInput.ts';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';
import TestItemLink from '@/components/common/TestItemLink/TestItemLink.tsx';


export type TestPageProps = {}

const TestPage: React.FC<TestPageProps> = (props) => {
    const {}                  = props;
    const [ value, onChange ] = useInput({
        initialValue: '',
        onChange    : (value) => console.log('value', value),
        debounce    : 500,
    });

    return (
        <Section size={ 'large' }>
            <SectionTitle size={ 'large' }>Тесты</SectionTitle>
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
                number={ 1 }
                title={ 'Общие правила' }
                list={ [
                    <TestItemLink
                        id={ '' }
                        disabled={ false }
                        label={ 'Законы' }
                        onClick={ () => {
                        } }
                        status={ 'satisfactorily' }
                        questions={ 17 }
                        rightAnswers={ 14 }
                    />,
                    <TestItemLink
                        id={ '' }
                        disabled={ false }
                        label={ 'Правила' }
                        onClick={ () => {
                        } }
                        status={ 'unsatisfactory' }
                        questions={ 16 }
                        rightAnswers={ 7 }
                    />,
                    <TestItemLink
                        id={ '' }
                        disabled={ false }
                        label={ 'Этикет' }
                        onClick={ () => {
                        } }
                        status={ 'perfect' }
                        questions={ 21 }
                        rightAnswers={ 21 }
                    />,
                ] }
            />
            <OrderedList
                number={ 2 }
                title={ 'Правила общения' }
                list={ [
                    <TestItemLink
                        id={ '' }
                        disabled={ false }
                        label={ 'Вежливость' }
                        onClick={ () => {
                        } }
                        status={ 'satisfactorily' }
                        questions={ 11 }
                        rightAnswers={ 7 }
                    />,
                    <TestItemLink
                        id={ '' }
                        disabled={ false }
                        label={ 'Открытость' }
                        onClick={ () => {
                        } }
                        status={ 'perfect' }
                        questions={ 13 }
                        rightAnswers={ 13 }
                    />,
                    <TestItemLink
                        id={ '' }
                        disabled={ false }
                        label={ 'Конкретика' }
                        onClick={ () => {
                        } }
                        status={ 'not-started' }
                        questions={ 27 }
                        rightAnswers={ 0 }
                    />,
                    <TestItemLink
                        id={ '' }
                        disabled={ true }
                        label={ 'Обвинения' }
                        onClick={ () => {
                        } }
                        status={ 'not-started' }
                        questions={ 13 }
                        rightAnswers={ 0 }
                    />,
                    <TestItemLink
                        id={ '' }
                        disabled={ true }
                        label={ 'Вопросы' }
                        onClick={ () => {
                        } }
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