import React from 'react';
import { Editor, FloatingMenu } from '@tiptap/react';
import Button from '@/components/ui/button/Button/Button.tsx';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import P from '@/components/ui/p/P/P.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import {
    IWindowPopupController,
} from '@/components/ui/popup/WindowPopup/WindowPopup.tsx';


export type ThemeFloatingMenuProps = {
    editor: Editor;
    imageCreatePopup: IWindowPopupController;
};

const ThemeFloatingMenu: React.FC<ThemeFloatingMenuProps> = (props) => {
    const { editor, imageCreatePopup } = props;

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
                    onClick={
                        () => imageCreatePopup.open()
                    }
                    quad
                    size="small"
                    styleType="default"
                >
                    <IconM>image</IconM>
                </Button>
                <Button
                    onClick={ () => editor.chain().focus().setFootnote({ type: 'warning' }).run() }
                    quad
                    size="small"
                    styleType="default"
                >
                    <IconM>list</IconM>
                </Button>
                <Button
                    onClick={ () => editor.chain().focus().insertTable({
                        rows: 3, cols: 3, withHeaderRow: true,
                    }).run() }
                    quad
                    size="small"
                    styleType="default"
                >
                    <IconM>table</IconM>
                </Button>
            </Flex>
        </FloatingMenu>
    );
};

export default React.memo(ThemeFloatingMenu);