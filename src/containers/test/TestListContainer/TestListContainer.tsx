import React, { useCallback } from 'react';
import { useFetchTestList } from '@/hooks/test/fetch/useFetchTestList.ts';
import Section from '@/components/ui/container/Section/Section.tsx';
import Collapse from '@/components/ui/collapse/Collapse/Collapse.tsx';
import TileBox from '@/components/ui/container/TileBox/TileBox.tsx';
import TestPreviewItem
    from '@/components/common/test/TestPreviewItem/TestPreviewItem.tsx';
import { useNavigate } from 'react-router-dom';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';


export type TestListContainerProps = {};

const TestListContainer: React.FC<TestListContainerProps> = (props) => {
    const {}                       = props;
    const { data, loading, error } = useFetchTestList();
    const navigate                 = useNavigate();
    const pageGetter               = usePageUrl();
    const navigateCallback         = useCallback((id: string) => {
        navigate(pageGetter.test(id));
    }, [ pageGetter, navigate ]);

    if (loading) {
        return 'loading..';
    }

    if (error) {
        return error.message;
    }

    if (!data) {
        return 'Not found';
    }

    return (
        <Section size="large">
            {
                data.map((theme) => (
                    <Collapse key={ theme.publicId } opened={ true }
                              title={ theme.publicId.replace(/-/gi, '.') + ' ' + theme.title }>
                        <TileBox>
                            {
                                theme.tests.map((test) => (
                                    <TestPreviewItem
                                        key={ test.id }
                                        test={ test }
                                        onClick={ navigateCallback }
                                    />
                                ))
                            }
                        </TileBox>
                    </Collapse>
                ))
            }
        </Section>
    );
};

export default React.memo(TestListContainer);