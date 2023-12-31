import React from 'react';
import { useParams } from 'react-router-dom';
import Title from '@/components/ui/title/Title/Title.tsx';
import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb.tsx';
import Footnote from '@/components/common/Footnote/Footnote.tsx';
import P from '@/components/ui/p/P/P.tsx';
import Section from '@/components/ui/container/box/Section.tsx';
import Button from '@/components/ui/button/Button/Button.tsx';


export type GuidItemPageProps = {}

const GuidItemPage: React.FC<GuidItemPageProps> = (props) => {
    const {}     = props;
    const params = useParams<{ id: string }>();

    /**
     * TODO:
     * 1. Получить ресурс по ID
     * 2. Показать
     */

    return (
        <Section size={ 'medium' }>
            <nav>
                <Breadcrumb
                    items={
                        [
                            {
                                label: <span className="material-symbols-outlined">home</span>,
                                url  : '/guid',
                            },
                            { label: 'Общие правила', url: '/guid/1' },
                        ]
                    }
                />
            </nav>
            <Title size={ 'large' }>Законы</Title>
            <P><strong>Законы</strong> играют важную роль в обществе,
                устанавливая правила и нормы, которые помогают поддерживать порядок и защищать права
                граждан.</P>
            <Footnote
                header={ 'Источник' }
                type={ 'notify' }
            >
                Основы права и юриспруденции, учебник для студентов юридических специальностей,
                издательство "Юстиция", 2020."
            </Footnote>
            <P>Законы это основа функционирования общества и
                устанавливают
                правила и нормы поведения, которые обеспечивают порядок, защищают права и свободы
                граждан, регулируют экономическую деятельность и обеспечивают справедливость</P>
            <Footnote
                header={ 'Применение законов' }
                type={ 'warning' }
            >
                При применении законов необходимо учитывать их контекст, а также обращать внимание
                на изменяющиеся социальные и экономические условия, чтобы обеспечить их справедливое
                применение и эффективное функционирование.
            </Footnote>
            <P>Они также являются основой работы правоохранительных
                органов и судов, обеспечивая соблюдение законов и наказание за их нарушение.</P>
            <P>Важность учета гуманитарных аспектов при применении
                законов заключается в необходимости обеспечения справедливости и равенства перед
                законом для всех членов общества. Это требует от правоохранительных органов,
                судебной системы и законодателей постоянного реагирования на изменяющиеся социальные
                и этические стандарты, чтобы гарантировать, что законы отражают ценности и
                потребности общества в целом.</P>
            <Footnote
                header={ 'Гуманитарные аспекты применения законов' }
                type={ 'urgent' }
            >
                Законы - это неизменно важная часть общества, однако их толкование и применение
                должно осуществляться с учётом нравственных, этических и гуманитарных принципов,
                чтобы обеспечить справедливость и равенство перед законом
            </Footnote>
            <P>Кроме того, правильное толкование законов с учётом
                гуманитарных аспектов способствует укреплению доверия граждан к правосудной системе,
                влияя на их легитимность и эффективность. Это также способствует созданию более
                здоровой и справедливой социальной среды, где граждане чувствуют себя защищёнными и
                равноправными перед законом.</P>
            <div style={ { display: 'flex', justifyContent: 'space-between', gap: 10 } }>
                <Button styleType={ 'main' }>Пройти тест</Button>
                <Button
                    styleType={ 'main' }
                    postfix={
                        <span className="material-symbols-outlined">arrow_forward</span>
                    }
                >
                    <span>Следующая тема: "Правила"</span>
                </Button>
            </div>
        </Section>
    );
};

export default React.memo(GuidItemPage);