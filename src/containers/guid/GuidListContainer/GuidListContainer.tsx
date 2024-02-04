import React, { useEffect, useState } from 'react';
import { useInput } from '@/hooks/ui/input/useInput.ts';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';
import Section from '@/components/ui/container/Section/Section.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import P from '@/components/ui/p/P/P.tsx';
import Input from '@/components/ui/input/Input/Input.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import TileBox from '@/components/ui/container/TileBox/TileBox.tsx';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';
import Link from '@/components/ui/link/Link/Link.tsx';
import { With } from '@/types/types.ts';
import { ThemeRecursiveChildren, ThemeShortType } from '@/types/theme/theme.types.ts';
import { GUID_ID, GUID_PAGE } from '@/constants/pages.ts';


export type GuidListContainerProps = {};

const GuidListContainer: React.FC<GuidListContainerProps> = (props) => {
    const {}                  = props;
    const [ value, onChange ] = useInput({
        initialValue: '',
        onChange    : (value) => console.log('value', value),
        debounce    : 500,
    });
    const pageGetter          = usePageUrl();

    // TODO: Temp
    const [ items, setItems ] = useState<With<ThemeShortType, [ ThemeRecursiveChildren ]>[]>([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/v1/themes/list')
            .then((response) => response.json())
            .then((data) => setItems(data));
    }, []);

    return (
        <Section size={ 'medium' }>
            <Section type={ 'div' } size={ 'medium' }>
                <Section type={ 'div' } size={ 'extra-small' }>
                    <Title size={ 'large' }>Обучающие материалы</Title>
                    <P item={ 'second' }>Перед вами учебник по работе с гражданами,
                        начиная
                        с основ, включающих в
                        себя много
                        тонкостей и фишек</P>
                </Section>
                <aside style={ { display: 'flex', gap: 5 } }>
                    <Input
                        style={ { width: '100%' } }
                        value={ value }
                        onChangeHandler={ onChange }
                        placeholder={ 'Поиск' }
                    />
                    <Button styleType={ 'main' }>Найти</Button>
                </aside>
            </Section>
            <TileBox>
                {
                    items.map((item) => (
                        <OrderedList
                            prefix={ item.publicId.replace(/-/gi, '.') }
                            showPrefix
                            item={ 'main' }
                            title={
                                <Link
                                    to={ `/${ GUID_PAGE }/${ item.publicId }` }>
                                    { item.title }
                                </Link>
                            }
                            list={
                                item.children.map((child) => (
                                    <Link
                                        to={ `/${ GUID_PAGE }/${ child.publicId }` }>
                                        { child.title }
                                    </Link>
                                ))
                            }
                        />
                    ))
                }
            </TileBox>
        </Section>
    );
};

export default React.memo(GuidListContainer);