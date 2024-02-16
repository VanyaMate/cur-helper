import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb.tsx';
import { GUID_PAGE, GUIDS_PAGE } from '@/constants/pages.ts';
import Title from '@/components/ui/title/Title/Title.tsx';
import P from '@/components/ui/p/P/P.tsx';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';
import Link from '@/components/ui/link/Link/Link.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import Section from '@/components/ui/container/Section/Section.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import React, { useCallback } from 'react';
import ContentBox from '@/components/common/ContentBox/ContentBox.tsx';
import { themesService } from '@/services/themes/themes.service.ts';
import { observer } from 'mobx-react-lite';
import Loader from '@/components/common/Loader/Loader.tsx';
import TileBox from '@/components/ui/container/TileBox/TileBox.tsx';
import TestPreviewItem
    from '@/components/common/test/TestPreviewItem/TestPreviewItem.tsx';
import Collapse from '@/components/ui/collapse/Collapse/Collapse.tsx';
import { useNavigate } from 'react-router-dom';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';
import ThemeTitleText from '@/components/common/theme/ThemeTitleText/ThemeTitleText.tsx';


export type GuidItemContainerProps = {
    id: string
};

const GuidItemContainer: React.FC<GuidItemContainerProps> = observer((props) => {
    const { id }           = props;
    const data             = themesService.fullThemeData.get(id);
    const navigate         = useNavigate();
    const pageGetter       = usePageUrl();
    const navigateCallback = useCallback((id: string) => {
        navigate(pageGetter.test(id));
    }, [ pageGetter, navigate ]);

    if (!data) {
        return <Loader/>;
    }

    return (
        <Section size="small" tag="section">
            <Breadcrumb
                items={ [
                    {
                        label: <IconM>home</IconM>,
                        url  : pageGetter.guids(),
                    },
                    ...data.breadcrumb.map((breadcrumb) => ({
                        label: breadcrumb.title,
                        url  : pageGetter.guid(breadcrumb.publicId),
                    })),
                ]
                }
            />
            <ContentBox>
                <Section size="large">
                    <Section size="extra-small">
                        <ThemeTitleText
                            publicId={ data.publicId }
                            size="large"
                            title={ data.title }
                        />
                        {
                            data.description ? <P type="second">{ data.description }</P>
                                             : null
                        }
                    </Section>
                    {
                        data.children.length ?
                        <OrderedList
                            item="main"
                            list={ data.children.map((child) => (
                                <Link
                                    key={ child.publicId }
                                    to={ pageGetter.guid(child.publicId) }>{ child.title }</Link>
                            )) }
                            selfIndex={ data.children.map((child) => child.publicId.replace(/-/g, '.')) }
                        /> : null
                    }
                    {
                        data.additional ? <P type="invisible">{ data.additional }</P>
                                        : null
                    }
                    {
                        data.body ? <P>{ data.body }</P> : null
                    }
                    <div>
                        <Button styleType="default">Следующая тема</Button>
                    </div>
                    <Collapse key={ data.publicId }
                              opened={ true }
                              title="Тесты">
                        <TileBox>
                            {
                                data.tests.map((test) => (
                                    <TestPreviewItem
                                        key={ test.id }
                                        onClick={ navigateCallback }
                                        test={ test }
                                    />
                                ))
                            }
                        </TileBox>
                    </Collapse>
                    <div>// FAQ</div>
                    <div>// comments</div>
                </Section>
            </ContentBox>
        </Section>
    );
});

export default GuidItemContainer;