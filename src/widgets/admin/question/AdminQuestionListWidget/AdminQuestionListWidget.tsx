import React from 'react';
import TileBox from '@/components/ui/container/TileBox/TileBox.tsx';
import { AdminQuestionShortType } from '@vanyamate/cur-helper-types';
import AdminQuestionPreviewItemFeature
    from '@/widgets/admin/question/AdminQuestionPreviewItemWidget/AdminQuestionPreviewItemWidget.tsx';


export type AdminQuestionListWidgetProps = {
    questions: AdminQuestionShortType[];
};

const AdminQuestionListWidget: React.FC<AdminQuestionListWidgetProps> = (props) => {
    const { questions } = props;

    return (
        <TileBox>
            {
                questions.map((question) =>
                    <AdminQuestionPreviewItemFeature
                        key={ question.id }
                        question={ question }
                    />,
                )
            }
        </TileBox>
    );
};

export default React.memo(AdminQuestionListWidget);