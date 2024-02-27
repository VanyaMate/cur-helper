import React from 'react';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';
import { useNavigate } from 'react-router-dom';


export type AdminEditTestButtonFeatureProps = {
    testId: string;
};

const AdminEditTestButtonFeature: React.FC<AdminEditTestButtonFeatureProps> = (props) => {
    const { testId } = props;
    const pageGetter = usePageUrl('admin');
    const navigate   = useNavigate();

    return (
        <Button
            onClick={ () => navigate(pageGetter.test(testId)) }
            quad
            size="small"
            styleType="default"
        >
            <IconM size="small">edit</IconM>
        </Button>
    );
};

export default React.memo(AdminEditTestButtonFeature);