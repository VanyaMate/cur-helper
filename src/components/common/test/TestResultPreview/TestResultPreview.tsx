import React from 'react';
import { TestPassingShortInfo } from '@/types/test-passing/test-passing.types.ts';
import Tag from '@/components/common/Tag/Tag.tsx';
import { useTestStatusLabel } from '@/hooks/test/useTestStatusLabel.ts';
import IconM from '@/components/ui/icon/IconM.tsx';
import SpaceBetween from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import P from '@/components/ui/p/P/P.tsx';


export type TestResultPreviewProps = {
    shortResult: TestPassingShortInfo | null;
};

const TestResultPreview: React.FC<TestResultPreviewProps> = (props) => {
    const { shortResult } = props;
    const label           = useTestStatusLabel(shortResult?.result);

    if (!shortResult) {
        return <Tag type="invisible">Не пройден</Tag>;
    }

    if (shortResult && shortResult.status === 'process') {
        return <Tag type="process">Выполняется</Tag>;
    }

    if (shortResult && shortResult.result) {
        return <SpaceBetween>
            <Tag type={
                shortResult.result === 'perfect'
                ? 'perfect'
                : shortResult.result === 'unsatis'
                  ? 'danger'
                  : 'main' }>
                { label }
            </Tag>
            <P item="invisible">15 дней назад</P>
        </SpaceBetween>;
    }
};

export default React.memo(TestResultPreview);