import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './TariffDetails.module.css';
import compIcon from '../../assets/images/comp.svg';
import targetIcon from '../../assets/images/target.svg';
import lampIcon from '../../assets/images/lamp.svg';

const TariffDetails = () => {
    const { tariffId } = useParams();

    // Маппинг тарифов
    const tariffs = {
        beginner: {
            title: 'Beginner',
            subtitle: 'Для небольшого исследования',
            icon: lampIcon,
            price: '799 ₽',
            oldPrice: '1 200 ₽',
            additionalInfo: 'или 150 ₽/мес. при рассрочке на 24 мес.',
            features: [
                'Безлимитная история запросов',
                'Безопасная сделка',
                'Поддержка 24/7',
            ],
            description: 'Подробное описание тарифа Beginner...',
        },
        pro: {
            title: 'Pro',
            subtitle: 'Для HR и фрилансеров',
            icon: targetIcon,
            price: '1 299 ₽',
            oldPrice: '2 600 ₽',
            additionalInfo: 'или 279 ₽/мес. при рассрочке на 24 мес.',
            features: [
                'Все пункты тарифа Beginner',
                'Экспорт истории',
                'Рекомендации по приоритетам',
            ],
            description: 'Подробное описание тарифа Pro...',
        },
        business: {
            title: 'Business',
            subtitle: 'Для корпоративных клиентов',
            icon: compIcon,
            price: '2 379 ₽',
            oldPrice: '3 700 ₽',
            features: [
                'Все пункты тарифа Pro',
                'Безлимитное количество запросов',
                'Приоритетная поддержка',
            ],
            description: 'Подробное описание тарифа Business...',
        },
    };

    const tariff = tariffs[tariffId.toLowerCase()];

    if (!tariff) {
        return (
            <div className={styles.notFound}>
                <h2>Тариф не найден</h2>
            </div>
        );
    }

    return (
        <div className={styles.tariffDetails}>
            <h1 className={styles.title}>{tariff.title}</h1>
            <p className={styles.subtitle}>{tariff.subtitle}</p>
            <img src={tariff.icon} alt={`${tariff.title} icon`} className={styles.icon} />
            <p className={styles.price}>{tariff.price}</p>
            {tariff.oldPrice && <p className={styles.oldPrice}>{tariff.oldPrice}</p>}
            {tariff.additionalInfo && <p className={styles.additionalInfo}>{tariff.additionalInfo}</p>}
            <ul className={styles.features}>
                {tariff.features.map((feature, index) => (
                    <li key={index} className={styles.featureItem}>
                        ✓ {feature}
                    </li>
                ))}
            </ul>
            <p className={styles.description}>{tariff.description}</p>
        </div>
    );
};

export default TariffDetails;
