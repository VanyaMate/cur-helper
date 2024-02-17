import React from 'react';
import { BubbleMenu, Editor } from '@tiptap/react';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';


export type ThemeBubbleMenuProps = {
    editor: Editor;
};

const ThemeBubbleMenu: React.FC<ThemeBubbleMenuProps> = (props) => {
    const { editor } = props;

    return (
        <BubbleMenu editor={ editor }>
            <Flex size="extra-small" type="main">
                <Button
                    onClick={ () => editor.chain().focus().toggleBold().run() }
                    quad
                    size="small"
                    styleType={ editor.isActive('bold') ? 'main' : 'default' }
                >
                    B
                </Button>
                <Button
                    onClick={ () => editor.chain().focus().toggleItalic().run() }
                    quad
                    size="small"
                    styleType={ editor.isActive('italic') ? 'main' : 'default' }
                >
                    I
                </Button>
                <Button
                    onClick={ () => editor.chain().focus().toggleStrike().run() }
                    quad
                    size="small"
                    styleType={ editor.isActive('strike') ? 'main' : 'default' }
                >
                    -
                </Button>
            </Flex>
        </BubbleMenu>
    );
};

export default ThemeBubbleMenu;