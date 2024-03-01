import React, { useRef } from 'react';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import {
    highlightColor,
    setColor, textColor, toggleHighlight,
} from '@/components/tiptap/helpers/text.ts';
import { Editor } from '@tiptap/react';
import ColorPicker from '@/components/ui/input/ColorPicker/ColorPicker.tsx';


export type TextColorRedactMenuProps = {
    editor: Editor;
};

const TextColorRedactMenu: React.FC<TextColorRedactMenuProps> = (props) => {
    const { editor } = props;
    const colorTimer = useRef<ReturnType<typeof setTimeout>>();

    return (
        <Flex size="extra-small">
            <ColorPicker
                onColorChange={ (color: string) => {
                    if (color !== 'transparent') {
                        clearTimeout(colorTimer.current);
                        colorTimer.current = setTimeout(() => {
                            setColor(editor)(color);
                        }, 200);
                    }
                } }
                value={ textColor(editor) }
            />
            |
            <ColorPicker
                onColorChange={ (color: string) => {
                    if (color !== 'transparent') {
                        clearTimeout(colorTimer.current);
                        colorTimer.current = setTimeout(() => {
                            toggleHighlight(editor)(color);
                        }, 200);
                    }
                } }
                value={ highlightColor(editor) }
            />
        </Flex>
    );
};

export default TextColorRedactMenu;