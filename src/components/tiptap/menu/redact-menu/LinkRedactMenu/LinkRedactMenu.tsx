import React, { useRef } from 'react';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import MenuButton from '@/components/tiptap/menu/MenuButton/MenuButton.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import { isLink, setLink, unsetLink } from '@/components/tiptap/helpers/link.ts';
import { Editor } from '@tiptap/react';
import WindowPopup from '@/components/ui/popup/WindowPopup/WindowPopup.tsx';
import {
    useWindowPopupController,
} from '@/hooks/ui/popup/WindowPopup/useWindowPopupController.ts';
import Input from '@/components/ui/input/Input/Input.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import Section from '@/components/ui/container/Section/Section.tsx';


export type LinkRedactMenuProps = {
    editor: Editor;
};

const LinkRedactMenu: React.FC<LinkRedactMenuProps> = (props) => {
    const { editor } = props;
    const linkPopup  = useWindowPopupController();
    const link       = useRef<string>('');

    return (
        <Flex size="extra-small" type="main">
            <WindowPopup controller={ linkPopup }>
                <Section size="small">
                    <Input
                        defaultValue=""
                        label="Ссылка"
                        onChangeHandler={ (value: string) => {
                            link.current = value;
                        } }
                        placeholder="Введите ссылку"
                    />
                    <Button onClick={ () => {
                        setLink(editor)(link.current);
                        linkPopup.close();
                    } }>
                        Добавить
                    </Button>
                </Section>
            </WindowPopup>
            <MenuButton
                isActive={ isLink(editor) }
                onClick={ linkPopup.open }
            >
                <IconM size="small">link</IconM>
            </MenuButton>
            <MenuButton
                activeType="danger"
                isActive={ isLink(editor) }
                onClick={ () => unsetLink(editor) }
            >
                <IconM size="small">close</IconM>
            </MenuButton>
        </Flex>
    );
};

export default LinkRedactMenu;