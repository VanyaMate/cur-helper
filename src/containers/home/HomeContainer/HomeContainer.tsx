import React from 'react';
import ArticlePreview from '@/components/common/ArticlePreview/ArticlePreview.tsx';
import TileBox from '@/components/ui/container/TileBox/TileBox.tsx';


export type HomeContainerProps = {};

const HomeContainer: React.FC<HomeContainerProps> = (props) => {
    const {} = props;

    return (
        <TileBox>
            <ArticlePreview
                image={ 'https://global.unitednations.entermediadb.net/assets/mediadb/services/module/asset/downloads/preset/Libraries/Production%20Library/26-12-2023_FAO_Holidays.jpg/image350x235cropped.jpg' }
                title={ 'Семнадцать дней рационального использования ресурсов: задачи на праздники' }
                description={ 'В праздники мы проводим много времени с семьей и друзьями, готовим праздничные блюда, дарим друг другу подарки или отправляемся навестить близких.' }
                date={ '15.01.2024' }
                type={ 'Новость' }
                url={ '' }
            />

            <ArticlePreview
                image={ 'https://global.unitednations.entermediadb.net/assets/mediadb/services/module/asset/downloads/preset/Libraries/Production%20Library/12-12-2023-UN-Photo-General-Assembly.jpg/image350x235cropped.jpg' }
                title={ 'Генассамблея ООН приняла две резолюции, предложенные Туркменистаном' }
                description={ 'На этой неделе члены Генеральной Ассамблеи ООН консенсусом одобрили две резолюции, инициированные Туркменистаном – по транспорту и энергетике.' }
                date={ '13.01.2024' }
                type={ 'Новость' }
                url={ '' }
            />

            <ArticlePreview
                image={ 'https://global.unitednations.entermediadb.net/assets/mediadb/services/module/asset/downloads/preset/Collections/Embargoed/02-11-2023-UN-Guterres-UK-01.jpg/image350x235cropped.jpg' }
                title={ 'Антониу Гутерриш: принципы управления ИИ должны основываться на Уставе ООН и Всеобщей декларации прав человека' }
                description={ 'Принципы управления искусственным интеллектом (ИИ) должны основываться на Уставе ООН и Всеобщей декларации прав человека.' }
                date={ '13.01.2024' }
                type={ 'Интервью' }
                url={ '' }
            />

            <ArticlePreview
                image={ 'https://global.unitednations.entermediadb.net/assets/mediadb/services/module/asset/downloads/preset/Libraries/Production%20Library/25-9-2023_Belarus_SDGs.jpg/image350x235cropped.jpg' }
                title={ 'Беларусь: односторонние санкции препятствуют выполнению Целей в области устойчивого развития ' }
                description={ 'Беларусь на 80 процентов выполнила задачи, поставленные в рамках Целей устойчивого развития.' }
                date={ '12.01.2024' }
                type={ 'Интервью' }
                url={ '' }
            />
            <ArticlePreview
                image={ 'https://global.unitednations.entermediadb.net/assets/mediadb/services/module/asset/downloads/preset/Collections/Embargoed/18-09-2023_UNICEF_Afghanistan-01.jpg/image350x235cropped.jpg' }
                title={ 'ЮНИСЕФ: права детей должны быть приоритетом в процессе достижения ЦУР' }
                description={ 'На сегодняшний день только 6 процентов детей в мире – 150 миллионов мальчиков и девочек – получили пользу от программ и проектов в рамках Повестки дня в области устойчивого развития.' }
                date={ '05.01.2024' }
                type={ 'Новость' }
                url={ '' }
            />
            <ArticlePreview
                image={ 'https://global.unitednations.entermediadb.net/assets/mediadb/services/module/asset/downloads/preset/Libraries/Production%20Library/18-09-2023_UN-Photo_SDG-summit.jpg/image350x235cropped.jpg' }
                title={ 'Обязательство выполнить ЦУР: участники саммита ООН приняли историческую декларацию' }
                description={ 'На саммите по Целям устойчивого развития (ЦУР) в Нью-Йорке, проходящем в рамках Недели высокого уровня Генеральной Ассамблеи ООН, мировые лидеры приняли политическую декларацию, в которой подчеркивается их коллективная приверженность построению стабильного, инклюзивного и процветающего мира к 2030 году.' }
                date={ '13.12.2023' }
                type={ 'Новость' }
                url={ '' }
            />
        </TileBox>
    );
};

export default React.memo(HomeContainer);