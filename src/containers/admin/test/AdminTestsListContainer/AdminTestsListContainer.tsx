import React from 'react';
import { adminTestService } from '@/services/admin-tests/admin-test.service.ts';
import { observer } from 'mobx-react-lite';
import TitleSection from '@/components/ui/container/TitleSection/TitleSection.tsx';
import AdminTestListWidget
    from '@/widgets/admin/test/AdminTestListWidget/AdminTestListWidget.tsx';
import AdminTestListHeaderExtraWidget
    from '@/widgets/admin/test/AdminTestListHeaderExtraWidget/AdminTestListHeaderExtraWidget.tsx';


export type AdminTestsListContainerProps = {};

const AdminTestsListContainer: React.FC<AdminTestsListContainerProps> = observer((props) => {
    const {}        = props;
    const testsList = adminTestService.testsList;

    return (
        <TitleSection
            extra={ <AdminTestListHeaderExtraWidget/> }
            title="Список тестов"
        >
            <AdminTestListWidget data={ testsList }/>
        </TitleSection>
    );
});

export default React.memo(AdminTestsListContainer);