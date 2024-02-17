import React from 'react';
import { Editor, FloatingMenu } from '@tiptap/react';
import Button from '@/components/ui/button/Button/Button.tsx';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import P from '@/components/ui/p/P/P.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';


export type ThemeFloatingMenuProps = {
    editor: Editor;
};

const ThemeFloatingMenu: React.FC<ThemeFloatingMenuProps> = (props) => {
    const { editor } = props;

    return (
        <FloatingMenu editor={ editor } tippyOptions={ { duration: 100 } }>
            <Flex size="extra-small" type="main">
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
                <Button
                    onClick={ () => editor.chain().focus().setImage({ src: 'https://i.ytimg.com/vi/zhXtTE7OSa0/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCLYz2QSx9mIAsFTRmXBTnQ4UJyEw' }).run() }
                    quad
                    size="small"
                    styleType={ editor.isActive('heading', { level: 3 }) ? 'main'
                                                                         : 'default' }
                >
                    <IconM>image</IconM>
                </Button>
                <Button
                    onClick={ () => editor.chain().focus().setTestPassing({ testId: '123123' }).run() }
                    quad
                    size="small"
                    styleType={ editor.isActive('heading', { level: 3 }) ? 'main'
                                                                         : 'default' }
                >
                    <IconM>list</IconM>
                </Button>
            </Flex>
        </FloatingMenu>
    );
};

export default React.memo(ThemeFloatingMenu);