import React from 'react';
import Button, { ButtonType } from '@/components/ui/button/Button/Button.tsx';


export type MenuButtonProps = {
    onClick: () => void;
    isActive: boolean;
    activeType?: ButtonType;
    children: React.ReactNode;
};

const MenuButton: React.FC<MenuButtonProps> = (props) => {
    const { onClick, isActive, children, activeType } = props;

    return (
        <Button
            onClick={ onClick }
            quad
            size="small"
            styleType={ isActive ? (activeType ?? 'main') : 'default' }
        >
            { children }
        </Button>
    );
};

export default MenuButton;