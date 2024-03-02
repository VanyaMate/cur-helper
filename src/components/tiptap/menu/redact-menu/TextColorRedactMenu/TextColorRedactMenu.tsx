import React, { useRef } from 'react';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import {
    highlightColor, isColor, isHighlight,
    setColor, textColor, toggleHighlight, unsetColor, unsetHighlight,
} from '@/components/tiptap/helpers/text.ts';
import { Editor } from '@tiptap/react';
import ColorPicker from '@/components/ui/input/ColorPicker/ColorPicker.tsx';
import MenuButton from '@/components/tiptap/menu/MenuButton/MenuButton.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';


export type TextColorRedactMenuProps = {
    editor: Editor;
};

const TextColorRedactMenu: React.FC<TextColorRedactMenuProps> = (props) => {
    const { editor } = props;
    const colorTimer = useRef<ReturnType<typeof setTimeout>>();

    const onColorChange = function (callback: (color: string) => void) {
        return (color: string) => {
            if (color !== 'transparent') {
                clearTimeout(colorTimer.current);
                colorTimer.current = setTimeout(() => {
                    callback(color);
                }, 200);
            }
        };
    };

    return (
        <Flex size="extra-small" type="main">
            <ColorPicker
                onColorChange={ onColorChange(setColor(editor)) }
                value={ textColor(editor) }
            />
            <MenuButton
                activeType="danger"
                isActive={ isColor(editor) }
                onClick={ () => unsetColor(editor) }
            >
                <IconM>close</IconM>
            </MenuButton>
            |
            <ColorPicker
                onColorChange={ onColorChange(toggleHighlight(editor)) }
                value={ highlightColor(editor) }
            />
            <MenuButton
                activeType="danger"
                isActive={ isHighlight(editor) }
                onClick={ () => unsetHighlight(editor) }
            >
                <IconM>close</IconM>
            </MenuButton>
        </Flex>
    );
};

export default TextColorRedactMenu;