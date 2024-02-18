import React from 'react';
import { BubbleMenu, Editor } from '@tiptap/react';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import MenuButton from '@/components/tiptap/menu/MenuButton/MenuButton.tsx';


export type ImageBubbleMenuProps = {
    editor: Editor;
};

const ImageBubbleMenu: React.FC<ImageBubbleMenuProps> = (props) => {
    const { editor } = props;

    return (
        <BubbleMenu editor={ editor }>
            <Flex type="main">
                <MenuButton isActive={ false }
                            onClick={ () => editor.chain().focus().deleteNode('image').run() }>
                    X
                </MenuButton>
            </Flex>
        </BubbleMenu>
    );
};

export default ImageBubbleMenu;