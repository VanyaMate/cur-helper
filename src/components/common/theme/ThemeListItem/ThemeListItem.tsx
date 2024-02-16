import React from 'react';
import { ThemeShortType } from '@/types/theme/theme.types.ts';
import ListTitledItemWithUrl
    from '@/components/ui/list/ListTitledItemWithUrl/ListTitledItemWithUrl.tsx';
import P from '@/components/ui/p/P/P.tsx';


// TODO: Add url generator
// add comment
export type ThemeListItemProps = {
    theme: ThemeShortType;
    urlGenerator: (id: string) => string;
};

const ThemeListItem: React.FC<ThemeListItemProps> = (props) => {
    const { theme, urlGenerator } = props;

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
            url={ urlGenerator(theme.publicId) }
        />
    );
};

export default React.memo(ThemeListItem);
