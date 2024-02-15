import React from 'react';
import { TestPassingShortInfo } from '@/types/test-passing/test-passing.types.ts';
import Tag from '@/components/common/Tag/Tag.tsx';
import { useTestStatusLabel } from '@/hooks/test/useTestStatusLabel.ts';
import SpaceBetween from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import P from '@/components/ui/p/P/P.tsx';
import { useDateDeltaWithPostfix } from '@/hooks/date/useDateDeltaWithPostfix.ts';


export type TestResultPreviewProps = {
    shortResult: TestPassingShortInfo | null;
};

const TestResultPreview: React.FC<TestResultPreviewProps> = (props) => {
    const { shortResult } = props;
    const label           = useTestStatusLabel(shortResult?.result);
    const timeOfFinish    = useDateDeltaWithPostfix(shortResult?.finishTime ?? Date.now(), Date.now());

    if (!shortResult) {
        return <Tag type="invisible">Не пройден</Tag>;
    }

    if (shortResult && shortResult.status === 'process') {
        return <Tag type="process">Выполняется</Tag>;
    }

    if (shortResult && shortResult.result) {
        return <SpaceBetween canWrap>
            <Tag type={
                shortResult.status === 'process' ? 'process' :
                shortResult.result === 'perfect'
                ? 'perfect'
                : shortResult.result === 'unsatis'
                  ? 'danger'
                  : 'main' }>
                { label }
            </Tag>
            <P item="invisible">{ timeOfFinish }</P>
        </SpaceBetween>;
    }
};

export default React.memo(TestResultPreview);