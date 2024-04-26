import React from 'react';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';


export type AdminEditThemeButtonFeatureProps = {
    themeId: string;
};

const AdminEditThemeButtonFeature: React.FC<AdminEditThemeButtonFeatureProps> = (props) => {
    const { themeId } = props;
    const pageGetter  = usePageUrl('admin');
    const navigate    = useNavigate();

    return (
        <Button
            onClick={ () => navigate(pageGetter.guid(themeId)) }
            quad
            size="small"
            styleType="default"
        >
            <IconM size="small">edit</IconM>
        </Button>
    );
};

export default React.memo(AdminEditThemeButtonFeature);