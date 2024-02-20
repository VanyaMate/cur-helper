import React, { useContext } from 'react';
import { FloatingMenu } from '@tiptap/react';
import HeadingRedactMenu
    from '@/components/tiptap/menu/redact-menu/HeadingRedactMenu/HeadingRedactMenu.tsx';
import ImageAddMenu
    from '@/components/tiptap/menu/add-menu/ImageAddMenu/ImageAddMenu.tsx';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import {
    RedactorEditorContext
} from '@/containers/redactor/RedactorItem/RedactorItemContext.ts';


export type BodyFloatingMenuProps = {};

const BodyFloatingMenu: React.FC<BodyFloatingMenuProps> = () => {
    const editor = useContext(RedactorEditorContext);

    if (!editor) {
        return null;
    }

    return (
        <FloatingMenu editor={ editor }>
            <Flex size="extra-small" type="main">
                <HeadingRedactMenu editor={ editor }/>
                |
                <ImageAddMenu editor={ editor }/>
            </Flex>
        </FloatingMenu>
    );
};

export default React.memo(BodyFloatingMenu);