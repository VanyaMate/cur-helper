import React from 'react';
import { ThemeShortType } from '@vanyamate/cur-helper-types/types/theme';
import SpaceBetween from '@/components/ui/container/flex/SpaceBetween/SpaceBetween.tsx';
import Section from '@/components/ui/container/Section/Section.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import P from '@/components/ui/p/P/P.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import IconM from '@/components/ui/icon/IconM.tsx';
import Flex from '@/components/ui/container/flex/Flex/Flex.tsx';
import { usePageUrl } from '@/hooks/page/usePageUrl.ts';
import { useNavigate } from 'react-router-dom';
import css from './ThemeItemPagePaginatorWidget.module.scss';


export type ThemeItemPagePaginatorWidgetProps = {
    next: ThemeShortType | null;
    prev: ThemeShortType | null;
};

const ThemeItemPagePaginatorWidget: React.FC<ThemeItemPagePaginatorWidgetProps> = (props) => {
    const { prev, next } = props;
    const pageGetter     = usePageUrl();
    const navigate       = useNavigate();

    return (
        <SpaceBetween className={ css.container }>
            {
                prev ?
                <Section block className={ css.item } size="extra-small" type="main">
                    <Section size="extra-small">
                        <P type="invisible">Тема: { prev.publicId }</P>
                        <Title lines={ 2 } size="small">{ prev.title }</Title>
                        <P
                            dangerouslySetInnerHTML={ { __html: prev.description } }
                            lines={ 2 }
                            type="second"
                        />
                        <P
                            dangerouslySetInnerHTML={ { __html: prev.additional } }
                            lines={ 1 }
                            type="invisible"
                        />
                    </Section>
                    <Button
                        onClick={ () => navigate(pageGetter.guid(prev.publicId)) }>
                        <Flex>
                            <IconM size="small">arrow_back</IconM> Назад
                        </Flex>
                    </Button>
                </Section> : null
            }
            {
                next ?
                <Section block className={ css.item } size="extra-small" type="main">
                    <Section size="extra-small">
                        <P type="invisible">Тема: { next.publicId }</P>
                        <Title lines={ 2 } size="small">{ next.title }</Title>
                        <P
                            dangerouslySetInnerHTML={ { __html: next.description } }
                            lines={ 2 }
                            type="second"
                        />
                        <P
                            dangerouslySetInnerHTML={ { __html: next.additional } }
                            lines={ 1 }
                            type="invisible"
                        />
                    </Section>
                    <Button
                        onClick={ () => navigate(pageGetter.guid(next.publicId)) }
                        styleType="main">
                        <Flex>
                            Вперед <IconM size="small">arrow_forward</IconM>
                        </Flex>
                    </Button>
                </Section> : null
            }
        </SpaceBetween>
    );
};

export default React.memo(ThemeItemPagePaginatorWidget);