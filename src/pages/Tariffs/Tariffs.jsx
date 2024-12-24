import React from 'react';
import styles from './Tariffs.module.css';
import TariffCard from '../../components/TariffCard/TariffCard';
import compIcon from '../../assets/images/comp.svg';
import targetIcon from '../../assets/images/target.svg';
import lampIcon from '../../assets/images/lamp.svg';

const Tariffs = () => {
    return (
        <div className={styles.tariffsPage}>
            <h1 className={styles.title}>Наши тарифы</h1>
            <div className={styles.cardsContainer}>
                <TariffCard
                    title="Beginner"
                    subtitle="Для небольшого исследования"
                    icon={lampIcon}
                    price="799 ₽"
                    oldPrice="1 200 ₽"
                    additionalInfo="или 150 ₽/мес. при рассрочке на 24 мес."
                    features={[
                        'Безлимитная история запросов',
                        'Безопасная сделка',
                        'Поддержка 24/7',
                    ]}
                    buttonText="Подробнее"
                    buttonLink="/tariffs/beginner"
                    backgroundColor="#FFB64F"
                />
                <TariffCard
                    title="Pro"
                    subtitle="Для HR и фрилансеров"
                    icon={targetIcon}
                    price="1 299 ₽"
                    oldPrice="2 600 ₽"
                    additionalInfo="или 279 ₽/мес. при рассрочке на 24 мес."
                    features={[
                        'Все пункты тарифа Beginner',
                        'Экспорт истории',
                        'Рекомендации по приоритетам',
                    ]}
                    buttonText="Подробнее"
                    buttonLink="/tariffs/pro"
                    backgroundColor="#7CE3E1"
                />
                <TariffCard
                    title="Business"
                    subtitle="Для корпоративных клиентов"
                    icon={compIcon}
                    price="2 379 ₽"
                    oldPrice="3 700 ₽"
                    features={[
                        'Все пункты тарифа Pro',
                        'Безлимитное количество запросов',
                        'Приоритетная поддержка',
                    ]}
                    buttonText="Подробнее"
                    buttonLink="/tariffs/business"
                    backgroundColor="#000000"
                />
            </div>
        </div>
    );
};

export default Tariffs;
