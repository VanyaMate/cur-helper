import React from 'react';
import css from './TestItemLink.module.scss';
import { cn } from '@vanyamate/helpers/react/classname';
import Section, { SectionType } from '@/components/ui/container/Section/Section.tsx';
import { TestPassingResult } from '@/types/test-passing/test-passing.types.ts';


export type TestItemLinkProps = {
    id: string;
    label: string;
    onClick: (id: string) => any;
    status: TestPassingResult;
    disabled: boolean;
    questions: number;
    rightAnswers: number;
    item?: SectionType;
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
            className={
                cn(
                    css.container,
                    disabled && css.disabled,
                    status === 'no-result' && css.not_started,
                    status === 'unsatis' && css.unsatisfactory,
                    status === 'satis' && css.satisfactory,
                    status === 'perfect' && css.perfect,
                )
            }
            onClick={ () => onClick(id) }
            tag="article"
            type={ item }
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
                        (status === 'no-result' && 'more_horiz') ||
                        (status === 'unsatis' && 'cancel') ||
                        (status === 'satis' && 'done') ||
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