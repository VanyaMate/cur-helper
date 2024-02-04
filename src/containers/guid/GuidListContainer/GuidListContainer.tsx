import React from 'react';
import { useInput } from '@/hooks/ui/input/useInput.ts';
import Section from '@/components/ui/container/Section/Section.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import P from '@/components/ui/p/P/P.tsx';
import Input from '@/components/ui/input/Input/Input.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import TileBox from '@/components/ui/container/TileBox/TileBox.tsx';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';
import Link from '@/components/ui/link/Link/Link.tsx';
import { GUID_PAGE } from '@/constants/pages.ts';
import { useFetchThemeList } from '@/hooks/theme/fetch/useFetchThemeList.ts';


export type GuidListContainerProps = {};

const GuidListContainer: React.FC<GuidListContainerProps> = (props) => {
    const {}                  = props;
    const [ value, onChange ] = useInput({
        initialValue: '',
        onChange    : (value) => console.log('value', value),
        debounce    : 500,
    });

    const { data, loading, error } = useFetchThemeList();

    console.log(error, loading, data);


    if (loading) {
        return 'loading..';
    }

    if (error) {
        return `Error: ${ error.message }`;
    }

    if (!data) {
        return '404';
    }

    return (
        <Section size="medium">
            <Section size="medium" type="div">
                <Section size="extra-small" type="div">
                    <Title size="large">Обучающие материалы</Title>
                    <P item="second">Перед вами учебник по работе с гражданами,
                        начиная
                        с основ, включающих в
                        себя много
                        тонкостей и фишек</P>
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
            </Section>
            <TileBox>
                {
                    data.map((item) => (
                        <OrderedList
                            item="main"
                            key={ item.publicId }
                            list={
                                item.children.map((child) => (
                                    <Link
                                        key={ child.publicId }
                                        to={ `/${ GUID_PAGE }/${ child.publicId }` }>
                                        { child.title }
                                    </Link>
                                ))
                            }
                            prefix={ item.publicId.replace(/-/gi, '.') }
                            showPrefix
                            title={
                                <Link
                                    to={ `/${ GUID_PAGE }/${ item.publicId }` }>
                                    { item.title }
                                </Link>
                            }
                        />
                    ))
                }
            </TileBox>
        </Section>
    );
};

export default React.memo(GuidListContainer);