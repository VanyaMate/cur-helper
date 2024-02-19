import React from 'react';
import WindowPopup, {
    IWindowPopupController,
} from '@/components/ui/popup/WindowPopup/WindowPopup.tsx';
import Section from '@/components/ui/container/Section/Section.tsx';
import Input from '@/components/ui/input/Input/Input.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import { setImage } from '@/components/tiptap/helpers/image.ts';
import { useInput } from '@/hooks/ui/input/useInput.ts';
import { Editor } from '@tiptap/react';


export type TipTapCreateImagePopupProps = {
    controller: IWindowPopupController;
    editor: Editor;
};

const TipTapCreateImagePopup: React.FC<TipTapCreateImagePopupProps> = (props) => {
    const { controller, editor } = props;
    const [ src, onChangeSrc ]   = useInput({
        initialValue: '',
    });
    const [ alt, onChangeAlt ]   = useInput({
        initialValue: '',
    });

    return (
        <WindowPopup controller={ controller }>
            <Section>
                <Input onChangeHandler={ onChangeSrc } placeholder="src"/>
                <Input onChangeHandler={ onChangeAlt } placeholder="alt"/>
                <Button onClick={ () => {
                    setImage(editor)({ src, alt });
                    controller.close();
                } }>Добавить</Button>
            </Section>
        </WindowPopup>
    );
};

export default React.memo(TipTapCreateImagePopup);