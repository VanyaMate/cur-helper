import React from 'react';
import ThemePreviewItem from '@/entity/guid/ThemePreviewItem/ThemePreviewItem.tsx';
import { AdminThemeShortType } from '@vanyamate/cur-helper-types';
import SpaceBetween from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import Toggle from '@/components/ui/input/checkbox/Toggle/Toggle.tsx';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import LabelToggle from '@/components/ui/input/checkbox/LabelToggle/LabelToggle.tsx';
import Tag from '@/components/common/Tag/Tag.tsx';
import AdminEditThemeButtonFeature
    from '@/features/admin/theme/AdminEditThemeButtonFeature/AdminEditThemeButtonFeature.tsx';


export type AdminThemePreviewItemWithConnectProps = {
    theme: AdminThemeShortType;
    onConnect: (state: boolean, themeId: string) => Promise<boolean>;
    defaultState?: boolean;
};

const AdminThemePreviewItemWithConnect: React.FC<AdminThemePreviewItemWithConnectProps> = (props) => {
    const { theme, onConnect, defaultState } = props;

    return (
        <ThemePreviewItem
            extra={
                <SpaceBetween>
                    <Toggle
                        active={ defaultState ?? true }
                        onToggleAsync={ async (value: boolean) => onConnect(value, theme.id) }
                        size="small"
                    />
                    <Flex>
                        <LabelToggle
                            active={ theme.enabled }
                            activeText={ <Tag type="main">Активен</Tag> }
                            size="small"
                            unActiveText={
                                <Tag type="invisible">Не активен</Tag>
                            }
                        />
                        <AdminEditThemeButtonFeature themeId={ theme.publicId }/>
                    </Flex>
                </SpaceBetween>
            }
            theme={ theme }
        />
    );
};

export default React.memo(AdminThemePreviewItemWithConnect);