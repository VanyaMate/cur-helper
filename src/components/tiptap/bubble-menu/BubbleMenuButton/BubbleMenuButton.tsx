import React from 'react';
import Button from '@/components/ui/button/Button/Button.tsx';


export type BubbleMenuButtonProps = {
    onClick: () => void;
    isActive: boolean;
    children: React.ReactNode;
};

const BubbleMenuButton: React.FC<BubbleMenuButtonProps> = (props) => {
    const { onClick, isActive, children } = props;

    return (
        <Button
            onClick={ onClick }
            quad
            size="small"
            styleType={ isActive ? 'main' : 'default' }
        >
            { children }
        </Button>
    );
};

export default React.memo(BubbleMenuButton);