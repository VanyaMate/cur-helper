import React, { useCallback } from 'react';
import Section from '@/components/ui/container/Section/Section.tsx';
import Collapse from '@/components/ui/collapse/Collapse/Collapse.tsx';
import TileBox from '@/components/ui/container/TileBox/TileBox.tsx';
import TestPreviewItem
    from '@/components/common/test/TestPreviewItem/TestPreviewItem.tsx';
import { useNavigate } from 'react-router-dom';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';
import { testsService } from '@/services/tests/tests.service.ts';
import { observer } from 'mobx-react-lite';
import Loader from '@/components/common/Loader/Loader.tsx';


export type TestListContainerProps = {};

const TestListContainer: React.FC<TestListContainerProps> = observer((props) => {
    const {}               = props;
    const data             = testsService.testList.get('');
    const navigate         = useNavigate();
    const pageGetter       = usePageUrl();
    const navigateCallback = useCallback((id: string) => {
        navigate(pageGetter.test(id));
    }, [ pageGetter, navigate ]);

    if (!data) {
        return <Loader/>;
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
                                        onClick={ navigateCallback }
                                        test={ test }
                                    />
                                ))
                            }
                        </TileBox>
                    </Collapse>
                ))
            }
        </Section>
    );
});

export default TestListContainer;