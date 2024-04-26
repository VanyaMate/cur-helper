import React from 'react';
import { Editor, FloatingMenu } from '@tiptap/react';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';


export type RedactorBubbleMenuProps = {
    menu: React.FC<{ editor: Editor }>[];
    editor: Editor;
};

const RedactorBubbleMenu: React.FC<RedactorBubbleMenuProps> = (props) => {
    const { menu, editor } = props;

    if (!editor || !menu.length) {
        return null;
    }

    return (
        <FloatingMenu editor={ editor }>
            <Flex size="extra-small" type="default">
                {
                    menu.map((Menu) => <Menu editor={ editor } key={ Menu.name }/>)
                }
            </Flex>
        </FloatingMenu>
    );
};

export default RedactorBubbleMenu;