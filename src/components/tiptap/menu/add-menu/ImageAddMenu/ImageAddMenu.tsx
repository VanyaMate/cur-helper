import React, { useState } from 'react';
import { Editor } from '@tiptap/react';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import WindowPopup from '@/components/ui/popup/WindowPopup/WindowPopup.tsx';
import {
    useWindowPopupController,
} from '@/hooks/ui/popup/WindowPopup/useWindowPopupController.ts';
import Input from '@/components/ui/input/Input/Input.tsx';
import { imageAttrs, setImage } from '@/components/tiptap/helpers/image.ts';
import Section from '@/components/ui/container/Section/Section.tsx';


export type ImageAddMenuProps = {
    editor: Editor;
};

const ImageAddMenu: React.FC<ImageAddMenuProps> = (props) => {
    const { editor }       = props;
    const imageCreatePopup = useWindowPopupController();
    const [ src, setSrc ]  = useState(imageAttrs(editor)?.src ?? '');
    const [ alt, setAlt ]  = useState(imageAttrs(editor)?.alt ?? '');

    return (
        <Flex size="extra-small" type="main">
            <WindowPopup controller={ imageCreatePopup }>
                <Section>
                    <Input
                        defaultValue={ src }
                        onChangeHandler={ setSrc }
                        placeholder="src"
                    />
                    <Input
                        defaultValue={ alt }
                        onChangeHandler={ setAlt }
                        placeholder="alt"
                    />
                    <Button onClick={
                        () => {
                            setImage(editor)({ src, alt });
                            imageCreatePopup.close();
                        }
                    }
                    >
                        Добавить
                    </Button>
                </Section>
            </WindowPopup>
            <Button
                onClick={
                    () => imageCreatePopup.open()
                }
                quad
                size="small"
                styleType="default"
            >
                <IconM size="small">image</IconM>
            </Button>
        </Flex>
    );
};

export default ImageAddMenu;