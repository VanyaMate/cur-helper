import React from 'react';
import ThemePreviewItem from '@/entity/guid/ThemePreviewItem/ThemePreviewItem.tsx';
import { AdminThemeShortType } from '@vanyamate/cur-helper-types';
import SpaceBetween from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import Toggle from '@/components/ui/input/checkbox/Toggle/Toggle.tsx';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import LabelToggle from '@/components/ui/input/checkbox/LabelToggle/LabelToggle.tsx';
import Tag from '@/components/common/Tag/Tag.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import { useNavigate } from 'react-router-dom';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';


export type AdminThemePreviewItemWithConnectProps = {
    theme: AdminThemeShortType;
    onConnect: (state: boolean, themeId: string) => Promise<boolean>
};

const AdminThemePreviewItemWithConnect: React.FC<AdminThemePreviewItemWithConnectProps> = (props) => {
    const { theme, onConnect } = props;
    const adminPageGetter      = usePageUrl('admin');
    const navigate             = useNavigate();

    return (
        <ThemePreviewItem
            extra={
                <SpaceBetween>
                    <Toggle
                        active={ true }
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
                        <Button
                            onClick={ () => navigate(adminPageGetter.guid(theme.publicId)) }
                            quad
                            size="small"
                            styleType="default"
                        >
                            <IconM size="small">edit</IconM>
                        </Button>
                    </Flex>
                </SpaceBetween>
            }
            theme={ theme }
        />
    );
};

export default React.memo(AdminThemePreviewItemWithConnect);