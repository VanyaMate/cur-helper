import React from 'react';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import CreateTestButtonFeature
    from '@/features/admin/test/AdminOpenCreateTestFormButtonFeature/AdminOpenCreateTestFormButtonFeature.tsx';


export type AdminTestListHeaderExtraWidgetProps = {
    themeId?: string;
};

const AdminTestListHeaderExtraWidget: React.FC<AdminTestListHeaderExtraWidgetProps> = (props) => {
    const { themeId } = props;

    return (
        <Flex>
            <CreateTestButtonFeature themeId={ themeId }/>
        </Flex>
    );
};

export default React.memo(AdminTestListHeaderExtraWidget);