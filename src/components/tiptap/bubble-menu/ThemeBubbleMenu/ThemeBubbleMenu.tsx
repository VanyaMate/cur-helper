import React from 'react';
import { BubbleMenu, Editor } from '@tiptap/react';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import P from '@/components/ui/p/P/P.tsx';


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
                <Button
                    onClick={ () => editor.chain().focus().toggleBlockquote().run() }
                    quad
                    size="small"
                    styleType={ editor.isActive('strike') ? 'main' : 'default' }
                >
                    |
                </Button>
                <Button
                    onClick={ () => editor.chain().focus().toggleHeading({ level: 1 }).run() }
                    quad
                    size="small"
                    styleType={ editor.isActive('heading', { level: 1 }) ? 'main'
                                                                         : 'default' }
                >
                    <P tag="span" type="second">h1</P>
                </Button>
                <Button
                    onClick={ () => editor.chain().focus().toggleHeading({ level: 2 }).run() }
                    quad
                    size="small"
                    styleType={ editor.isActive('heading', { level: 2 }) ? 'main'
                                                                         : 'default' }
                >
                    <P tag="span" type="second">h2</P>
                </Button>
                <Button
                    onClick={ () => editor.chain().focus().toggleHeading({ level: 3 }).run() }
                    quad
                    size="small"
                    styleType={ editor.isActive('heading', { level: 3 }) ? 'main'
                                                                         : 'default' }
                >
                    <P tag="span" type="second">h3</P>
                </Button>
            </Flex>
        </BubbleMenu>
    );
};

export default ThemeBubbleMenu;