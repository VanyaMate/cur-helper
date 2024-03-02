import React from 'react';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import MenuButton from '@/components/tiptap/menu/MenuButton/MenuButton.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import { isList, toggleList } from '@/components/tiptap/helpers/list.ts';
import { Editor } from '@tiptap/react';


export type ListAddMenuProps = {
    editor: Editor;
};

const ListAddMenu: React.FC<ListAddMenuProps> = (props) => {
    const { editor } = props;

    return (
        <Flex size="extra-small" type="main">
            <MenuButton
                isActive={ isList(editor) }
                onClick={ () => toggleList(editor) }
            >
                <IconM size="small">list</IconM>
            </MenuButton>
        </Flex>
    );
};

export default ListAddMenu;