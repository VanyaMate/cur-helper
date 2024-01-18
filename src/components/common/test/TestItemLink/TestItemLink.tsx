import React from 'react';
import css from './TestItemLink.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';
import { TestResult } from '@/types/test/test.types.ts';
import Section, { SectionItem } from '@/components/ui/container/Section/Section.tsx';


export type TestItemLinkProps = {
    id: string;
    label: string;
    onClick: (id: string) => any;
    status: TestResult;
    disabled: boolean;
    questions: number;
    rightAnswers: number;
    item?: SectionItem;
}

const TestItemLink: React.FC<TestItemLinkProps> = (props) => {
    const {
              id,
              label,
              onClick,
              status,
              disabled,
              questions,
              rightAnswers,
              item,
          } = props;

    return (
        <Section
            type={ 'article' }
            item={ item }
            className={
                cn(
                    css.container,
                    disabled && css.disabled,
                    status === 'not-started' && css.not_started,
                    status === 'unsatisfactory' && css.unsatisfactory,
                    status === 'satisfactorily' && css.satisfactory,
                    status === 'perfect' && css.perfect,
                )
            }
            onClick={ () => onClick(id) }
        >
            <div className={ css.left }>
                <span
                    className={
                        cn(
                            'material-symbols-outlined',
                            css.icon,
                        )
                    }
                >
                    {
                        (status === 'not-started' && 'more_horiz') ||
                        (status === 'unsatisfactory' && 'cancel') ||
                        (status === 'satisfactorily' && 'done') ||
                        (status === 'perfect' && 'done_all') || 'more_horiz'
                    }
                </span>
                <div className={ css.label }>{ label }</div>
            </div>
            <div className={ css.stats }>
                <div className={ css.answers }>{ rightAnswers }</div>
                <div className={ css.divider }>/</div>
                <div className={ css.questions }>{ questions }</div>
            </div>
        </Section>
    );
};

export default React.memo(TestItemLink);