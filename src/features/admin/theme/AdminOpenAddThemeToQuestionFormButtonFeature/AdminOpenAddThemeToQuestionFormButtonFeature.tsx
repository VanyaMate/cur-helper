import React from 'react';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import {
    useWindowPopupController,
} from '@/hooks/ui/popup/WindowPopup/useWindowPopupController.ts';
import WindowPopup from '@/components/ui/popup/WindowPopup/WindowPopup.tsx';
import AdminCreateQuestionFormWidget
    from '@/widgets/admin/question/AdminCreateQuestionFormWidget/AdminCreateQuestionFormWidget';


export type AdminOpenAddThemeToQuestionFormButtonFeatureProps = {
    themeId: string;
};

const AdminOpenAddThemeToQuestionFormButtonFeature: React.FC<AdminOpenAddThemeToQuestionFormButtonFeatureProps> = (props) => {
    const { themeId }            = props;
    const addQuestionToThemeForm = useWindowPopupController();

    return (
        <>
            <WindowPopup controller={ addQuestionToThemeForm }>
                <AdminCreateQuestionFormWidget defaultThemePublicId={ themeId }/>
            </WindowPopup>
            <Button
                onClick={ () => addQuestionToThemeForm.open() }
                quad
                size="small"
                styleType="default"
            >
                <IconM size="small">add</IconM>
            </Button>
        </>
    );
};

export default React.memo(AdminOpenAddThemeToQuestionFormButtonFeature);