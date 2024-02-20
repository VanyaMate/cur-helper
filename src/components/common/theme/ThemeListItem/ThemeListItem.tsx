import React from 'react';
import ListTitledItemWithUrl
    from '@/components/ui/list/ListTitledItemWithUrl/ListTitledItemWithUrl.tsx';
import ThemeTitleText from '@/components/common/theme/ThemeTitleText/ThemeTitleText.tsx';
import { ThemeShortType } from '@vanyamate/cur-helper-types';


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
