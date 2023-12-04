import React from 'react';
import SectionTitle from '@/components/ui/title/Title/Title.tsx';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';
import Link from '@/components/ui/link/Link/Link.tsx';
import Input from '@/components/ui/input/Input/Input.tsx';
import { useInput } from '@/hooks/ui/input/useInput.ts';


export type GuidPageProps = {}

const GuidPage: React.FC<GuidPageProps> = (props) => {
    const {}                  = props;
    const [ value, onChange ] = useInput({
        initialValue: '',
        onChange    : (value) => console.log('value', value),
        debounce    : 500,
    });


    return (
        <section style={ { display: 'flex', flexDirection: 'column', gap: 20 } }>
            <SectionTitle size={ 'large' }>Обучающие материалы</SectionTitle>
            <p>Перед вами учебник по работе с гражданами, начиная с основ, включающих в себя много
                тонкостей и фишек</p>
            <Input value={ value } onChangeHandler={ onChange }/>
            <OrderedList
                number={ 1 }
                title={ 'Общие правила' }
                list={ [
                    <Link to={ `/guid/1-1` }>Законы</Link>,
                    <Link to={ `/guid/1-2` }>Правила</Link>,
                    <Link to={ `/guid/1-3` }>Этикет</Link>,
                ] }
            />
            <OrderedList
                number={ 2 }
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
                number={ 3 }
                title={ 'Запретные вещи' }
                list={ [
                    <Link to={ '#' }>Слова</Link>,
                    <Link to={ '#' }>Темы</Link>,
                    <Link to={ '#' }>Темы</Link>,
                    <Link to={ '#' }>Темы</Link>,
                    <Link to={ '#' }>Темы</Link>,
                ] }
            />
        </section>
    );
};

export default React.memo(GuidPage);