import React from 'react';
import TileBox from '@/components/ui/container/TileBox/TileBox.tsx';
import { AdminTestShortType, MultiplyResponse } from '@vanyamate/cur-helper-types';
import AdminTestPreviewItem
    from '@/widgets/admin/test/AdminTestPreviewItem/AdminTestPreviewItem.tsx';


export type AdminTestListWidgetProps = {
    data: MultiplyResponse<AdminTestShortType>
};

const AdminTestListWidget: React.FC<AdminTestListWidgetProps> = (props) => {
    const { data } = props;

    return (
        <TileBox>
            {
                data.list.map((test) => (
                    <AdminTestPreviewItem key={ test.id } test={ test }/>
                ))
            }
        </TileBox>
    );
};

export default React.memo(AdminTestListWidget);