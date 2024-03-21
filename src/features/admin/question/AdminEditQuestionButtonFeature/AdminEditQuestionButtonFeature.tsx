import React from 'react';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';


export type AdminEditQuestionButtonFeatureProps = {
    questionId: string;
};

const AdminEditQuestionButtonFeature: React.FC<AdminEditQuestionButtonFeatureProps> = (props) => {
    const { questionId } = props;
    const pageGetter     = usePageUrl('admin');
    const navigate       = useNavigate();

    return (
        <Button
            onClick={ () => navigate(pageGetter.question(questionId)) }
            quad
            size="small"
            styleType="default"
        >
            <IconM size="small">edit</IconM>
        </Button>
    );
};

export default React.memo(AdminEditQuestionButtonFeature);