import React, { useContext } from 'react';
import { BubbleMenu, Editor } from '@tiptap/react';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import {
    RedactorEditorContext
} from '@/containers/redactor/RedactorItem/RedactorItemContext.ts';


export type RedactorBubbleMenuProps = {
    menu: React.FC<{ editor: Editor }>[];
};

const RedactorBubbleMenu: React.FC<RedactorBubbleMenuProps> = (props) => {
    const { menu } = props;
    const editor   = useContext(RedactorEditorContext);

    if (!editor || !menu.length) {
        return null;
    }

    return (
        <BubbleMenu editor={ editor }>
            <Flex size="extra-small" type="main">
                {
                    menu.map((Menu) => <Menu editor={ editor } key={ Menu.name }/>)
                }
            </Flex>
        </BubbleMenu>
    );
};

export default RedactorBubbleMenu;