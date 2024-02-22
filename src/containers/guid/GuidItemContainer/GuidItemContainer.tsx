import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb.tsx';
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
import { isNotEmptyHtml } from '@/helpers/in-not-empty-html.helper.ts';
import Title from '@/components/ui/title/Title/Title.tsx';


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
                        <Section size="extra-small" type="second">
                            <P type="invisible">Тема: { data.publicId.replace(/-/g, '.') }</P>
                            {
                                isNotEmptyHtml(data.additional)
                                ? <P
                                    className="tiptap"
                                    dangerouslySetInnerHTML={ { __html: data.additional } }
                                    tag="div"
                                    type="invisible"
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