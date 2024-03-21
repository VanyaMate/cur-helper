import React from 'react';
import TileBox from '@/components/ui/container/TileBox/TileBox.tsx';
import Section from '@/components/ui/container/Section/Section.tsx';
import SpaceBetween from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import P from '@/components/ui/p/P/P.tsx';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import { AdminTestShortType, MultiplyResponse } from '@vanyamate/cur-helper-types';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';
import { useNavigate } from 'react-router-dom';
import LabelToggle from '@/components/ui/input/checkbox/LabelToggle/LabelToggle.tsx';
import Tag from '@/components/common/Tag/Tag.tsx';
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