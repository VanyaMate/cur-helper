import React from 'react';
import { adminThemeService } from '@/services/admin-theme/admin-theme.service.ts';
import { observer } from 'mobx-react-lite';
import TitleSection from '@/components/ui/container/TitleSection/TitleSection.tsx';
import AdminThemeListWidget
    from '@/widgets/admin/theme/AdminThemeListWidget/AdminThemeListWidget.tsx';
import AdminThemeListHeaderExtraWidget
    from '@/widgets/admin/theme/AdminThemeListHeaderExtraWidget/AdminThemeListHeaderExtraWidget';


export type AdminThemeListContainerProps = {};

const AdminThemeListContainer: React.FC<AdminThemeListContainerProps> = observer((props) => {
    const {}        = props;
    const themeList = adminThemeService.themesList;

    return (
        <TitleSection
            extra={ <AdminThemeListHeaderExtraWidget/> }
            title="Список тем"
        >
            <AdminThemeListWidget data={ themeList }/>
        </TitleSection>
    );
});

export default React.memo(AdminThemeListContainer);