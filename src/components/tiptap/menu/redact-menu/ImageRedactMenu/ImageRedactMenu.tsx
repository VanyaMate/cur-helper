import React, { useState } from 'react';
import { Editor } from '@tiptap/react';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import MenuButton from '@/components/tiptap/menu/MenuButton/MenuButton.tsx';
import WindowPopup from '@/components/ui/popup/WindowPopup/WindowPopup.tsx';
import {
    useWindowPopupController,
} from '@/hooks/ui/popup/WindowPopup/useWindowPopupController.ts';
import Input from '@/components/ui/input/Input/Input.tsx';
import { imageAttrs, isImage, updateImage } from '@/components/tiptap/helpers/image.ts';
import Section from '@/components/ui/container/Section/Section.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';


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
            </WindowPopup>
            <Flex size="extra-small" type="main">
                <MenuButton isActive={ false }
                            onClick={ () => imageRedactorController.open() }>
                    <IconM size="small">edit</IconM>
                </MenuButton>
                <MenuButton isActive={ false }
                            onClick={ () => editor.chain().focus().deleteNode('image').run() }>
                    <IconM size="small">close</IconM>
                </MenuButton>
            </Flex>
        </>
    );
};

export default ImageRedactMenu;