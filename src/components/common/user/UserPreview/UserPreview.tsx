import React from 'react';
import Section from '@/components/ui/container/Section/Section.tsx';
import SpaceBetween from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import AdditionalList from '@/components/ui/container/AdditionalList/AdditionalList.tsx';
import { User } from '@/types/user/user.types.ts';
import RoundImage from '@/components/ui/image/RoundImage/RoundImage.tsx';


export type UserPreviewProps = {
    user: User;
};

const UserPreview: React.FC<UserPreviewProps> = (props) => {
    const { user } = props;

    return (
        <Section
            type="section"
        >
            <SpaceBetween size="small">
                <RoundImage
                    alt="Аватарка"
                    size="140px"
                    src={ user.avatar }
                />
                <AdditionalList
                    item="main"
                    list={ [
                        { label: 'Id', value: user.id },
                        { label: 'Имя', value: user.info.firstName },
                        { label: 'Фамилия', value: user.info.lastName },
                        { label: 'Роль', value: user.role },
                    ] }
                />
            </SpaceBetween>
        </Section>
    );
};

export default React.memo(UserPreview);