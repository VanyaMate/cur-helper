import React from 'react';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import MenuButton from '@/components/tiptap/menu/MenuButton/MenuButton.tsx';
import {
    isBold,
    isItalic, isStrike,
    toggleBold,
    toggleItalic, toggleStrike,
} from '@/components/tiptap/helpers/text.ts';
import { Editor } from '@tiptap/react';


export type TextFormattingRedactMenuProps = {
    editor: Editor;
};

const TextFormattingRedactMenu: React.FC<TextFormattingRedactMenuProps> = (props) => {
    const { editor } = props;

    return (
        <Flex size="extra-small" type="main">
            <MenuButton
                isActive={ isBold(editor) }
                onClick={ () => toggleBold(editor) }
            >
                B
            </MenuButton>
            <MenuButton
                isActive={ isItalic(editor) }
                onClick={ () => toggleItalic(editor) }
            >
                I
            </MenuButton>
            <MenuButton
                isActive={ isStrike(editor) }
                onClick={ () => toggleStrike(editor) }
            >
                -
            </MenuButton>
        </Flex>
    );
};

export default TextFormattingRedactMenu;