import React from 'react';
import { BubbleMenu, Editor } from '@tiptap/react';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import P from '@/components/ui/p/P/P.tsx';
import MenuButton
    from '@/components/tiptap/menu/MenuButton/MenuButton.tsx';
import {
    isBold,
    isItalic,
    isStrike,
    toggleBold, toggleItalic, toggleStrike,
} from '@/components/tiptap/helpers/text.ts';
import { isHeadingLevel, toggleHeading } from '@/components/tiptap/helpers/heading.ts';
import {
    isFootnoteType, toggleFootnote,
} from '@/components/tiptap/extensions/TipTapFootnote/helpers/footnote.ts';
import { isImage } from '@/components/tiptap/helpers/image.ts';
import {
    IWindowPopupController,
} from '@/components/ui/popup/WindowPopup/WindowPopup.tsx';
import { insertTable, isTable } from '@/components/tiptap/helpers/table.ts';


export type ThemeBubbleMenuProps = {
    editor: Editor;
    imageRedactorController: IWindowPopupController;
};

const ThemeBubbleMenu: React.FC<ThemeBubbleMenuProps> = (props) => {
    const { editor, imageRedactorController } = props;

    // TODO: Вынести в отдельный компонент не получается. Какая-то ошибка с fiber. Пока не до этого
    if (isImage(editor)) {
        return (
            <BubbleMenu editor={ editor }>
                <Flex size="extra-small" type="main">
                    <MenuButton isActive={ false }
                                onClick={ () => imageRedactorController.open() }>
                        R
                    </MenuButton>
                    <MenuButton isActive={ false }
                                onClick={ () => editor.chain().focus().deleteSelection().run() }>
                        X
                    </MenuButton>
                </Flex>
            </BubbleMenu>
        );
    }

    if (isTable(editor)) {
        return (
            <BubbleMenu editor={ editor }>
                <Flex size="extra-small" type="main">
                    <MenuButton
                        isActive={ false }
                        onClick={ () => insertTable(editor)({
                            cols: 1, rows: 1, withHeaderRow: true,
                        }) }
                    >
                        +
                    </MenuButton>
                </Flex>
            </BubbleMenu>
        );
    }

    return (
        <BubbleMenu editor={ editor }>
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
                |
                <MenuButton
                    isActive={ isHeadingLevel(editor)(1) }
                    onClick={ () => toggleHeading(editor)(1) }
                >
                    <P tag="span" type="second">h1</P>
                </MenuButton>
                <MenuButton
                    isActive={ isHeadingLevel(editor)(2) }
                    onClick={ () => toggleHeading(editor)(2) }
                >
                    <P tag="span" type="second">h2</P>
                </MenuButton>
                <MenuButton
                    isActive={ isHeadingLevel(editor)(3) }
                    onClick={ () => toggleHeading(editor)(3) }
                >
                    <P tag="span" type="second">h3</P>
                </MenuButton>
                |
                <MenuButton
                    isActive={ isFootnoteType(editor)('urgent') }
                    onClick={ () => toggleFootnote(editor)('urgent') }
                >
                    <P tag="span" type="second">U</P>
                </MenuButton>
                <MenuButton
                    isActive={ isFootnoteType(editor)('warning') }
                    onClick={ () => toggleFootnote(editor)('warning') }
                >
                    <P tag="span" type="second">W</P>
                </MenuButton>
                <MenuButton
                    isActive={ isFootnoteType(editor)('notify') }
                    onClick={ () => toggleFootnote(editor)('notify') }
                >
                    <P tag="span" type="second">N</P>
                </MenuButton>
            </Flex>
        </BubbleMenu>
    );
};

export default ThemeBubbleMenu;