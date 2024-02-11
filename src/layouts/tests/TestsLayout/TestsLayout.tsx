import React from 'react';
import { useInput } from '@/hooks/ui/input/useInput.ts';
import Section from '@/components/ui/container/Section/Section.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import P from '@/components/ui/p/P/P.tsx';
import Input from '@/components/ui/input/Input/Input.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import { Outlet } from 'react-router-dom';


export type TestsLayoutProps = {};

const TestsLayout: React.FC<TestsLayoutProps> = (props) => {
    const {}                  = props;
    const [ value, onChange ] = useInput({
        initialValue: '',
        onChange    : (value) => console.log('value', value),
        debounce    : 500,
    });

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
            <Outlet/>
        </Section>
    );
};

export default React.memo(TestsLayout);