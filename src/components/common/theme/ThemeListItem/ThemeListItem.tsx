import React from 'react';
import { ThemeShortType } from '@/types/theme/theme.types.ts';
import ListTitledItemWithUrl
    from '@/components/ui/list/ListTitledItemWithUrl/ListTitledItemWithUrl.tsx';
import P from '@/components/ui/p/P/P.tsx';


export type ThemeListItemProps = {
    theme: ThemeShortType;
};

const ThemeListItem: React.FC<ThemeListItemProps> = (props) => {
    const { theme } = props;

    return (
        <ListTitledItemWithUrl
            body={ theme.additional }
            key={ theme.title }
            title={
                <>
                    <P item="invisible"
                       type="span">{ theme.publicId.replace(/-/gi, '.') } </P>
                    { theme.title }
                </>
            }
            url={ `/guid/${ theme.publicId }` }
        />
    );
};

export default React.memo(ThemeListItem);
