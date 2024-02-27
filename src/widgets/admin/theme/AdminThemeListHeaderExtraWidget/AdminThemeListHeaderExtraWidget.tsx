import React from 'react';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import CreateThemeButtonFeature
    from '@/features/admin/theme/OpenCreateThemeFormButtonFeature/OpenCreateThemeFormButtonFeature.tsx';


export type AdminThemeListHeaderExtraWidgetProps = {};

const AdminThemeListHeaderExtraWidget: React.FC<AdminThemeListHeaderExtraWidgetProps> = (props) => {
    const {} = props;

    return (
        <Flex>
            <CreateThemeButtonFeature/>
        </Flex>
    );
};

export default React.memo(AdminThemeListHeaderExtraWidget);