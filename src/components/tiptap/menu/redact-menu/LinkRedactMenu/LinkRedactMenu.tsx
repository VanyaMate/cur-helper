import React from 'react';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import MenuButton from '@/components/tiptap/menu/MenuButton/MenuButton.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import { isLink } from '@/components/tiptap/helpers/link.ts';
import { Editor } from '@tiptap/react';


export type LinkRedactMenuProps = {
    editor: Editor;
};

const LinkRedactMenu: React.FC<LinkRedactMenuProps> = (props) => {
    const { editor } = props;

    return (
        <Flex size="extra-small" type="main">
            <MenuButton
                isActive={ isLink(editor) }
                onClick={ () => console.log('open') }
            >
                <IconM size="small">link</IconM>
            </MenuButton>
        </Flex>
    );
};

export default React.memo(LinkRedactMenu);