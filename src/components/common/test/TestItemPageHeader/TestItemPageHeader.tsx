import React from 'react';
import { TestStatus } from '@/components/common/test/TestItemLink/TestItemLink.tsx';
import Title from '@/components/ui/title/Title/Title.tsx';
import Section from '@/components/ui/container/box/Section.tsx';
import css from './TestItemPageHeader.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';
import { useTestStatusLabel } from '@/hooks/test/useTestStatusLabel.ts';
import Button from '@/components/ui/button/Button/Button.tsx';
import { useWindowPopupController } from '@/hooks/ui/popup/WindowPopup/useWindowPopupController.ts';
import WindowPopup from '@/components/ui/popup/WindowPopup/WindowPopup.tsx';
import GuidItemPage from '@/pages/guid/item/GuidItemPage.tsx';


export type TestItemPageHeaderProps = {
    title: string;
    status: TestStatus;
    date: string;
    extra: React.ReactNode | string;
}

const TestItemPageHeader: React.FC<TestItemPageHeaderProps> = (props) => {
    const {
              title,
              status,
              date,
              extra,
          } = props;

    const label = useTestStatusLabel(status);

    return (
        <Section
            size={ 'medium' }
            type={ 'section' }
            className={
                cn(
                    css.container,
                    status === 'not-started' && css.not_started,
                    status === 'unsatisfactory' && css.unsatisfactory,
                    status === 'satisfactorily' && css.satisfactory,
                    status === 'perfect' && css.perfect,
                )
            }>
            {
                /**
                 * TODO: Вынести в отдельный компонент
                 */
            }
            <div
                style={ {
                    display       : 'flex',
                    justifyContent: 'space-between',
                    alignItems    : 'center',
                } }>
                <Title>Тест на тему "{ title }"</Title>
                { extra }
            </div>
            <footer className={ css.footer }>
                <span className={ css.status }>{ label }</span>
                {
                    (status !== 'not-started') &&
                    <span className={ css.date }><span>пройдено: </span>{ date }</span>
                }
            </footer>
        </Section>
    );
};

export default React.memo(TestItemPageHeader);