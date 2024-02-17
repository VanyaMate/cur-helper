import React, { Suspense } from 'react';
import { useInput } from '@/hooks/ui/input/useInput.ts';
import Section from '@/components/ui/container/Section/Section.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import P from '@/components/ui/p/P/P.tsx';
import Input from '@/components/ui/input/Input/Input.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import { Outlet } from 'react-router-dom';
import Loader from '@/components/common/Loader/Loader.tsx';


export type TestsLayoutProps = {};

const TestsLayout: React.FC<TestsLayoutProps> = (props) => {
    const {}                  = props;
    const [ value, onChange ] = useInput({
        initialValue: '',
        onChange    : (value) => console.log('value', value),
        debounce    : 500,
    });

    return (
        <Section size="medium" tag="section">
            <Section size="extra-small">
                <Title size="large">Тесты</Title>
                <P type="second">Пройдите тесты чтобы проверить свои знания</P>
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
            <Suspense fallback={ <Loader/> }>
                <Outlet/>
            </Suspense>
        </Section>
    );
};

export default React.memo(TestsLayout);