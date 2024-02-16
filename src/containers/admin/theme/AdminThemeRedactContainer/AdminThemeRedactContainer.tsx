import React from 'react';
import Section from '@/components/ui/container/Section/Section.tsx';
import Input from '@/components/ui/input/Input/Input.tsx';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';
import P from '@/components/ui/p/P/P.tsx';


export type AdminThemeRedactContainerProps = {};

const AdminThemeRedactContainer: React.FC<AdminThemeRedactContainerProps> = (props) => {
    const {} = props;

    return (
        <Section>
            <OrderedList
                item="main"
                list={ [
                    'Короткая информация о теме',
                    <OrderedList
                        item
                        key="item"
                        list={ [
                            'Редактирование',
                            'Добавить тему (ребенка)',
                            'Добавить тест',
                        ] }
                        title="Кнопки для управления"
                    />,
                    'Информация о теме (связанная с пользователями)',
                ] }
                selfIndex={ [ '1', '', '3' ] }
            />
            <br/>
            <br/>
            <hr/>
            <br/>
            <br/>
            <P type="invisible">Публичный ID</P>
            <Input onChangeHandler={ () => console.log() } value="1-1"/>
            <P type="invisible">Заголовок</P>
            <Input onChangeHandler={ () => console.log() } value="Законы и законы"/>
            <P type="invisible">Описание</P>
            <Input onChangeHandler={ () => console.log() }
                   value="Основы этики и профессионального поведения для государственных служащих. Включает примеры конфликта интересов и этическое руководство для повседневных ситуаций"/>
            <P type="invisible">Дополнительная информация</P>
            <Input onChangeHandler={ () => console.log() } value="На момент 2023 года"/>
            <P type="invisible">Текст</P>
            <Input onChangeHandler={ () => console.log() }
                   value="Тема охватывает основные принципы этики в государственной основы этики и профессионального поведения для государственных"/>
        </Section>
    );
};

export default React.memo(AdminThemeRedactContainer);