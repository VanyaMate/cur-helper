import React from 'react';
import Link from '@/components/ui/link/Link/Link.tsx';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';


export type AdminThemeListContainerProps = {};

const AdminThemeListContainer: React.FC<AdminThemeListContainerProps> = (props) => {
    const {}         = props;
    const pageGetter = usePageUrl();

    return (
        <div>
            // list of themes
            <Link to={ `/admin${ pageGetter.guid('1') }` }>to theme</Link>
        </div>
    );
};

export default React.memo(AdminThemeListContainer);