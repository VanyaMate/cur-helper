import React from 'react';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';
import Link from '@/components/ui/link/Link/Link.tsx';
import Input from '@/components/ui/input/Input/Input.tsx';
import { useInput } from '@/hooks/ui/input/useInput.ts';
import Button from '@/components/ui/button/Button/Button.tsx';
import P from '@/components/ui/p/P/P.tsx';
import Section from '@/components/ui/container/box/Section.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';


export type GuidPageProps = {}

const GuidPage: React.FC<GuidPageProps> = (props) => {
    const {}                  = props;
    const [ value, onChange ] = useInput({
        initialValue: '',
        onChange    : (value) => console.log('value', value),
        debounce    : 500,
    });
    const pageGetter          = usePageUrl();


    return (
        <Section size={ 'large' }>
            <Title size={ 'large' }>Обучающие материалы</Title>
            <P>Перед вами учебник по работе с гражданами, начиная с основ, включающих в
                себя много
                тонкостей и фишек</P>
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
                title={
                    <Link to={ pageGetter.guid('1') }>Общие правила</Link>
                }
                list={ [
                    <Link to={ pageGetter.guid('1-1') }>Законы</Link>,
                    <Link to={ pageGetter.guid('1-2') }>Правила</Link>,
                    <Link to={ pageGetter.guid('1-3') }>Этикет</Link>,
                ] }
            />
            <OrderedList
                prefix={ '2' }
                title={ 'Правила общения' }
                list={ [
                    <Link to={ '#' }>Вежливость</Link>,
                    <Link to={ '#' }>Открытость</Link>,
                    <Link to={ '#' }>Конкретика</Link>,
                    <Link to={ '#' }>Обвинения</Link>,
                    <Link to={ '#' }>Вопросы</Link>,
                ] }
            />
            <OrderedList
                prefix={ '3' }
                title={ 'Запретные вещи' }
                list={ [
                    <Link to={ '#' }>Слова</Link>,
                    <Link to={ '#' }>Темы</Link>,
                    <Link to={ '#' }>Темы</Link>,
                    <Link to={ '#' }>Темы</Link>,
                    <Link to={ '#' }>Темы</Link>,
                ] }
            />
        </Section>
    );
};

export default React.memo(GuidPage);