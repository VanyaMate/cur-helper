import Flex from '@/components/ui/container/flex/Flex/Flex';
import React from 'react';
import { insertTable } from '@/components/tiptap/helpers/table.ts';
import MenuButton from '@/components/tiptap/menu/MenuButton/MenuButton.tsx';
import { Editor } from '@tiptap/react';


export type TableRedactMenuProps = {
    editor: Editor;
};

const TableRedactMenu: React.FC<TableRedactMenuProps> = (props) => {
    const { editor } = props;

    return (
        <Flex size="extra-small">
            <MenuButton
                isActive={ false }
                onClick={ () => insertTable(editor)({
                    cols: 2, rows: 2, withHeaderRow: true,
                }) }
            >
                +
            </MenuButton>
        </Flex>
    );
};

export default TableRedactMenu;