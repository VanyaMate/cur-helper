import React from 'react';
import { ThemeShortType } from '@/types/theme/theme.types.ts';
import ListTitledItemWithUrl
    from '@/components/ui/list/ListTitledItemWithUrl/ListTitledItemWithUrl.tsx';
import ThemeTitleText from '@/components/common/theme/ThemeTitleText/ThemeTitleText.tsx';


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
                <ThemeTitleText publicId={ theme.publicId } title={ theme.title }/>
            }
            url={ urlGenerator(theme.publicId) }
        />
    );
};

export default React.memo(ThemeListItem);
