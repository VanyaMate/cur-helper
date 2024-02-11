import React, { useCallback, useState } from 'react';
import Section from '@/components/ui/container/Section/Section.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import P from '@/components/ui/p/P/P.tsx';
import Collapse from '@/components/ui/collapse/Collapse/Collapse.tsx';
import OrderedList from '@/components/ui/list/OrderedList/OrderedList.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';
import css from './TestBriefieg.module.scss';
import IconM from '@/components/ui/icon/IconM.tsx';
import ThemeListItem from '@/components/common/theme/ThemeListItem/ThemeListItem.tsx';
import { ThemeShortType } from '@/types/theme/theme.types.ts';


export type TestBriefingProps = {
    title: string;
    description: string;
    themes: ThemeShortType[];
    timeToPass: string;
    onStart: () => Promise<any>;
    //eslint-disable-next-line react/no-unused-prop-types
    onClose: () => any;
}

const TestBriefing: React.FC<TestBriefingProps> = (props) => {
    const { title, themes, timeToPass, description, onStart } = props;
    const [ loading, setLoading ]                             = useState<boolean>(false);
    const onStartCallback                                     = useCallback(() => {
        setLoading(true);
        onStart().finally(() => setLoading(false));
    }, [ onStart, setLoading ]);

    return (
        <Section
            className={ css.container }
            size="small"
        >
            <div className={ css.header }>
                <div className={ css.info }>
                    <div className={ css.title }>
                        <span className={ css.prefix }>Тест на тему</span>
                        <Title>{ title }</Title>
                    </div>
                </div>
                <footer className={ css.footer }>
                    <div className={ css.footer_info }>
                        {
                            description ? <P className={ css.notice }>{ description }</P>
                                        : null
                        }
                        <P className={ css.timeToPass } item="invisible">
                            Время на прохождение: { timeToPass }
                        </P>
                    </div>
                    <Button
                        onClick={ onStartCallback }
                        postfix={ loading ?
                                  <IconM className="loading">cached</IconM> :
                                  <IconM>arrow_forward</IconM>
                        }
                        styleType="main"
                    >
                        Начать
                    </Button>
                </footer>
            </div>
            <Collapse item="default" opened={ true }
                      title="Темы затрагиваемые в тесте">
                <OrderedList
                    list={
                        themes.map((theme) => (
                            <ThemeListItem
                                key={ theme.publicId }
                                theme={ theme }
                            />
                        ))
                    }
                />
            </Collapse>
        </Section>
    );
};

export default React.memo(TestBriefing);