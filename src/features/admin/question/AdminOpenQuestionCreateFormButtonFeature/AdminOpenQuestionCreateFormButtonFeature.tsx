import React from 'react';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import WindowPopup from '@/components/ui/popup/WindowPopup/WindowPopup.tsx';
import {
    useWindowPopupController,
} from '@/hooks/ui/popup/WindowPopup/useWindowPopupController.ts';


export type AdminOpenQuestionCreateFormButtonFeatureProps = {};

const AdminOpenQuestionCreateFormButtonFeature: React.FC<AdminOpenQuestionCreateFormButtonFeatureProps> = (props) => {
    const {}                  = props;
    const questionCreatePopup = useWindowPopupController();

    return (
        <>
            <WindowPopup controller={ questionCreatePopup }>
                create form
            </WindowPopup>
            <Button
                onClick={ questionCreatePopup.open }
                quad
                size="small"
            >
                <IconM size="small">edit</IconM>
            </Button>
        </>
    );
};

export default React.memo(AdminOpenQuestionCreateFormButtonFeature);