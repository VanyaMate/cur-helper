import React, { useContext } from 'react';
import { isImage } from '@/components/tiptap/helpers/image.ts';
import { BubbleMenu } from '@tiptap/react';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import { isTable } from '@/components/tiptap/helpers/table.ts';
import ImageRedactMenu
    from '@/components/tiptap/menu/redact-menu/ImageRedactMenu/ImageRedactMenu.tsx';
import TextFormattingRedactMenu
    from '@/components/tiptap/menu/redact-menu/TextFormattingRedactMenu/TextFormattingRedactMenu.tsx';
import TableRedactMenu
    from '@/components/tiptap/menu/redact-menu/TableRedactMenu/TableRedactMenu.tsx';
import HeadingRedactMenu
    from '@/components/tiptap/menu/redact-menu/HeadingRedactMenu/HeadingRedactMenu.tsx';
import FootnoteRedactMenu
    from '@/components/tiptap/menu/redact-menu/FootnoteRedactMenu/FootnoteRedactMenu';
import {
    RedactorEditorContext
} from '@/containers/redactor/RedactorItem/RedactorItemContext.ts';


export type BodyBubbleMenuProps = {};

const BodyBubbleMenu: React.FC<BodyBubbleMenuProps> = () => {
    const editor = useContext(RedactorEditorContext);

    if (!editor) {
        return null;
    }

    return (
        <BubbleMenu editor={ editor } tippyOptions={ {} }>
            <Flex size="extra-small" type="main">
                {
                    isTable(editor) ? <><TableRedactMenu editor={ editor }/>|</> : null
                }
                {
                    isImage(editor)
                    ? <ImageRedactMenu editor={ editor }/>
                    : <>
                        <TextFormattingRedactMenu editor={ editor }/>
                        |
                        <HeadingRedactMenu editor={ editor }/>
                    </>
                }
                |
                <FootnoteRedactMenu editor={ editor }/>
            </Flex>
        </BubbleMenu>
    );
};

export default BodyBubbleMenu;