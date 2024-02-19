import React, { useEffect, useState } from 'react';
import WindowPopup, {
    IWindowPopupController,
} from '@/components/ui/popup/WindowPopup/WindowPopup.tsx';
import Section from '@/components/ui/container/Section/Section.tsx';
import Input from '@/components/ui/input/Input/Input.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import { imageAttrs, updateImage } from '@/components/tiptap/helpers/image.ts';
import { Editor } from '@tiptap/react';


export type TipTapChangeImagePopupProps = {
    controller: IWindowPopupController,
    editor: Editor
};

const TipTapChangeImagePopup: React.FC<TipTapChangeImagePopupProps> = (props) => {
    const { controller, editor } = props;
    const imageAttributes        = controller.opened ? imageAttrs(editor) : {
        src: '', alt: '',
    };
    const [ src, setSrc ]        = useState(imageAttributes?.src ?? '');
    const [ alt, setAlt ]        = useState(imageAttributes?.alt ?? '');

    useEffect(() => {
        setSrc(imageAttributes?.src ?? '');
        setAlt(imageAttributes?.alt ?? '');
    }, [ imageAttributes?.src, imageAttributes?.alt ]);

    return (
        <WindowPopup controller={ controller }>
            <Section>
                <Input defaultValue={ src } onChangeHandler={ (value) => setSrc(value) }
                       placeholder="src"/>
                <Input defaultValue={ alt } onChangeHandler={ (value) => setAlt(value) }
                       placeholder="alt"/>
                <Button onClick={ () => {
                    updateImage(editor)({
                        src, alt,
                    });
                    controller.close();
                } }>Изменить</Button>
            </Section>
        </WindowPopup>
    );
};

export default TipTapChangeImagePopup;