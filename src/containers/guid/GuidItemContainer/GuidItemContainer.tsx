import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb.tsx';
import P from '@/components/ui/p/P/P.tsx';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';
import Link from '@/components/ui/link/Link/Link.tsx';
import Section from '@/components/ui/container/Section/Section.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import React, { useCallback } from 'react';
import ContentBox from '@/components/common/ContentBox/ContentBox.tsx';
import { themesService } from '@/services/themes/themes.service.ts';
import { observer } from 'mobx-react-lite';
import TileBox from '@/components/ui/container/TileBox/TileBox.tsx';
import TestPreviewItem
    from '@/components/common/test/TestPreviewItem/TestPreviewItem.tsx';
import Collapse from '@/components/ui/collapse/Collapse/Collapse.tsx';
import { useNavigate } from 'react-router-dom';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';
import { isNotEmptyHtml } from '@/helpers/in-not-empty-html.helper.ts';
import Title from '@/components/ui/title/Title/Title.tsx';
import ThemeItemPagePaginatorWidget
    from '@/widgets/theme/ThemeItemPagePaginatorWidget/ThemeItemPagePaginatorWidget.tsx';
import FetchShow from '@/components/common/FetchShow/FetchShow.tsx';


export type GuidItemContainerProps = {
    id: string
};

const GuidItemContainer: React.FC<GuidItemContainerProps> = observer((props) => {
    const { id }           = props;
    const fetch            = themesService.fullThemeData[id];
    const navigate         = useNavigate();
    const pageGetter       = usePageUrl();
    const navigateCallback = useCallback((id: string) => {
        navigate(pageGetter.test(id));
    }, [ pageGetter, navigate ]);
    const data             = fetch?.data;

    return (
        <FetchShow fetch={ fetch }>
            {
                data
                ? <Section size="small" tag="section">
                    <ContentBox>
                        <Section size="medium">
                            <Section size="extra-small">
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
                                    ] }
                                />
                                <Section size="extra-small" type="mark">
                                    <P type="second">Тема: { data.publicId.replace(/-/g, '.') }</P>
                                    {
                                        isNotEmptyHtml(data.additional)
                                        ? <P
                                            className="tiptap"
                                            dangerouslySetInnerHTML={ { __html: data.additional } }
                                            tag="div"
                                            type="second"
                                        />
                                        : null
                                    }
                                </Section>
                            </Section>
                            <Section size="extra-small">
                                <Title>{ data.title }</Title>
                                {
                                    isNotEmptyHtml(data.description)
                                    ? <P
                                        className="tiptap"
                                        dangerouslySetInnerHTML={ { __html: data.description } }
                                        tag="div"
                                        type="second"
                                    />
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
                                isNotEmptyHtml(data.body)
                                ? <Section>
                                    <P
                                        className="tiptap"
                                        dangerouslySetInnerHTML={ { __html: data.body } }
                                        tag="div"
                                    />
                                </Section> : null
                            }
                            <ThemeItemPagePaginatorWidget next={ data.next }
                                                          prev={ data.prev }/>
                            <Collapse opened={ true } title="Тесты">
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
                        </Section>
                    </ContentBox>
                </Section>
                : null
            }
        </FetchShow>
    );
});

export default GuidItemContainer;