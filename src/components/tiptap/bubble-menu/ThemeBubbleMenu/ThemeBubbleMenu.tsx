import React from 'react';
import { BubbleMenu, Editor } from '@tiptap/react';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import P from '@/components/ui/p/P/P.tsx';
import { FootnoteType } from '@/components/common/Footnote/Footnote.tsx';
import BubbleMenuButton
    from '@/components/tiptap/bubble-menu/BubbleMenuButton/BubbleMenuButton.tsx';
import {
    isBold,
    isItalic,
    isStrike,
    toggleBold, toggleItalic, toggleStrike,
} from '@/components/tiptap/helpers/text.ts';
import { isHeadingLevel, toggleHeading } from '@/components/tiptap/helpers/heading.ts';
import {
    isFootnoteType, toggleFootnote,
} from '@/components/tiptap/components/TipTapFootnote/helpers/footnote.ts';


export type ThemeBubbleMenuProps = {
    editor: Editor;
};

const ThemeBubbleMenu: React.FC<ThemeBubbleMenuProps> = (props) => {
    const { editor } = props;

    return (
        <BubbleMenu editor={ editor }>
            <Flex size="extra-small" type="main">
                <BubbleMenuButton
                    isActive={ isBold(editor) }
                    onClick={ () => toggleBold(editor) }
                >
                    B
                </BubbleMenuButton>
                <BubbleMenuButton
                    isActive={ isItalic(editor) }
                    onClick={ () => toggleItalic(editor) }
                >
                    I
                </BubbleMenuButton>
                <BubbleMenuButton
                    isActive={ isStrike(editor) }
                    onClick={ () => toggleStrike(editor) }
                >
                    -
                </BubbleMenuButton>
                |
                <BubbleMenuButton
                    isActive={ isHeadingLevel(editor)(1) }
                    onClick={ () => toggleHeading(editor)(1) }
                >
                    <P tag="span" type="second">h1</P>
                </BubbleMenuButton>
                <BubbleMenuButton
                    isActive={ isHeadingLevel(editor)(2) }
                    onClick={ () => toggleHeading(editor)(2) }
                >
                    <P tag="span" type="second">h2</P>
                </BubbleMenuButton>
                <BubbleMenuButton
                    isActive={ isHeadingLevel(editor)(2) }
                    onClick={ () => toggleHeading(editor)(2) }
                >
                    <P tag="span" type="second">h3</P>
                </BubbleMenuButton>
                |
                <BubbleMenuButton
                    isActive={ isFootnoteType(editor)('urgent') }
                    onClick={ () => toggleFootnote(editor)('urgent') }
                >
                    <P tag="span" type="second">U</P>
                </BubbleMenuButton>
                <BubbleMenuButton
                    isActive={ isFootnoteType(editor)('warning') }
                    onClick={ () => toggleFootnote(editor)('warning') }
                >
                    <P tag="span" type="second">W</P>
                </BubbleMenuButton>
                <BubbleMenuButton
                    isActive={ isFootnoteType(editor)('notify') }
                    onClick={ () => toggleFootnote(editor)('notify') }
                >
                    <P tag="span" type="second">N</P>
                </BubbleMenuButton>
            </Flex>
        </BubbleMenu>
    );
};

export default ThemeBubbleMenu;