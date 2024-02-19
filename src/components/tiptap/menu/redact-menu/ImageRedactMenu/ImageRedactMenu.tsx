import React, { useState } from 'react';
import { Editor } from '@tiptap/react';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import MenuButton from '@/components/tiptap/menu/MenuButton/MenuButton.tsx';
import { createPortal } from 'react-dom';
import WindowPopup from '@/components/ui/popup/WindowPopup/WindowPopup.tsx';
import {
    useWindowPopupController,
} from '@/hooks/ui/popup/WindowPopup/useWindowPopupController.ts';
import Input from '@/components/ui/input/Input/Input.tsx';
import { imageAttrs, isImage, updateImage } from '@/components/tiptap/helpers/image.ts';
import Section from '@/components/ui/container/Section/Section.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';


export type ImageBubbleMenuProps = {
    editor: Editor;
};

const ImageRedactMenu: React.FC<ImageBubbleMenuProps> = (props) => {
    const { editor }              = props;
    const imageRedactorController = useWindowPopupController();
    const [ src, setSrc ]         = useState(imageAttrs(editor)?.src ?? '');
    const [ alt, setAlt ]         = useState(imageAttrs(editor)?.alt ?? '');

    if (!isImage(editor)) {
        return null;
    }

    return (
        <>
            {
                createPortal(
                    <WindowPopup controller={ imageRedactorController }>
                        <Section>
                            <Input
                                defaultValue={ src }
                                onChangeHandler={ setSrc }
                            />
                            <Input
                                defaultValue={ alt }
                                onChangeHandler={ setAlt }
                            />
                            <Button onClick={
                                () => {
                                    updateImage(editor)({ src, alt });
                                    imageRedactorController.close();
                                } }
                            >
                                Изменить
                            </Button>
                        </Section>
                    </WindowPopup>,
                    document.body,
                )
            }
            <Flex size="extra-small">
                <MenuButton isActive={ false }
                            onClick={ () => imageRedactorController.open() }>
                    R
                </MenuButton>
                <MenuButton isActive={ false }
                            onClick={ () => editor.chain().focus().deleteNode('image').run() }>
                    X
                </MenuButton>
            </Flex>
        </>
    );
};

export default ImageRedactMenu;