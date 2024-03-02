import React from 'react';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import MenuButton from '@/components/tiptap/menu/MenuButton/MenuButton.tsx';
import {
    isFootnoteType,
    toggleFootnote,
} from '@/components/tiptap/extensions/TipTapFootnote/helpers/footnote.ts';
import P from '@/components/ui/p/P/P.tsx';
import { Editor } from '@tiptap/react';


export type FootnoteRedactMenuProps = {
    editor: Editor;
};

const FootnoteRedactMenu: React.FC<FootnoteRedactMenuProps> = (props) => {
    const { editor } = props;

    return (
        <Flex size="extra-small" type="main">
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
    );
};

export default FootnoteRedactMenu;