import React, { useEffect, useRef } from 'react';
import Section from '@/components/ui/container/Section/Section.tsx';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import EditorJS from '@editorjs/editorjs';
import { THEME_EDITOR_TOOLS } from '@/containers/editorjs/tools/theme-editor.tools.ts';


export type AdminThemeRedactContainerProps = {};

const AdminThemeRedactContainer: React.FC<AdminThemeRedactContainerProps> = (props) => {
    const {}     = props;
    const editor = useRef<EditorJS>();

    useEffect(() => {
        if (!editor.current) {
            editor.current = new EditorJS({
                data  : JSON.parse(localStorage.getItem('editorjs') ?? '{}') ?? '',
                tools : THEME_EDITOR_TOOLS,
                holder: 'content',
                onChange (): void {
                    if (editor.current && !editor.current.readOnly) {
                        editor.current?.save().then((data) => {
                            localStorage.setItem('editorjs', JSON.stringify(data));
                        });
                    }
                },
            });
        }
    }, []);

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
            <Title>EditorJS</Title>
            <div id="content"/>
        </Section>
    );
};

export default React.memo(AdminThemeRedactContainer);