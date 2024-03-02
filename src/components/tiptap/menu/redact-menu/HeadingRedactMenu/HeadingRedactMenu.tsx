import React from 'react';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import MenuButton from '@/components/tiptap/menu/MenuButton/MenuButton.tsx';
import { isHeadingLevel, toggleHeading } from '@/components/tiptap/helpers/heading.ts';
import P from '@/components/ui/p/P/P.tsx';
import { Editor } from '@tiptap/react';


export type HeadingRedactMenuProps = {
    editor: Editor;
};

const HeadingRedactMenu: React.FC<HeadingRedactMenuProps> = (props) => {
    const { editor } = props;

    return (
        <Flex size="extra-small" type="main">
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
        </Flex>
    );
};

export default HeadingRedactMenu;