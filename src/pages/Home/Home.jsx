import React from 'react';
import styles from './Home.module.css';
import homeImage from '../../assets/images/home-1.jpeg';
import homeImage3 from '../../assets/images/home-3.png';
import { FaClock, FaSearch, FaShieldAlt } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import TariffCard from '../../components/TariffCard/TariffCard';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Импортируем иконки тарифов
import compIcon from '../../assets/images/comp.svg';
import targetIcon from '../../assets/images/target.svg';
import lampIcon from '../../assets/images/lamp.svg';

// Импортируем кастомные стрелки
import CustomArrow from '../../components/CustomArrow/CustomArrow';

const Home = () => {
    const { token } = useSelector((state) => state.auth);

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <CustomArrow direction="next" />,
        prevArrow: <CustomArrow direction="prev" />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const carouselItems = [
        {
            icon: <FaClock className={styles.icon} />,
            title: 'Высокая и оперативная скорость обработки заявки',
        },
        {
            icon: <FaSearch className={styles.icon} />,
            title: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос',
        },
        {
            icon: <FaShieldAlt className={styles.icon} />,
            title:
                'Защита конфиденциальных сведений, не подлежащих разглашению по федеральному законодательству',
        },
    ];

    return (
        <div className={styles.homeContainer}>
            {/* Первый Блок */}
            <div className={styles.firstBlock}>
                <div className={styles.textSection}>
                    <h1 className={styles.mainTitle}>
                        СЕРВИС ПО ПОИСКУ ПУБЛИКАЦИЙ О КОМПАНИИ ПО ЕГО ИНН
                    </h1>
                    <p className={styles.subtitle}>
                        Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.
                    </p>
                    {token ? (
                        <Link to="/search">
                            <button className={styles.requestButton}>Запросить данные</button>
                        </Link>
                    ) : (
                        <Link to="/login">
                            <button className={styles.requestButton}>Войти для запроса данных</button>
                        </Link>
                    )}
                </div>
                <div className={styles.imageSection}>
                    <img src={homeImage} alt="Главная" className={styles.homeImage} />
                </div>
            </div>

            {/* Второй Блок */}
            <div className={styles.secondBlock}>
                <h2 className={styles.secondTitle}>ПОЧЕМУ ИМЕННО МЫ</h2>
                <Slider {...sliderSettings} className={styles.carousel}>
                    {carouselItems.map((item, index) => (
                        <div key={index} className={styles.carouselItem}>
                            <div className={styles.iconContainer}>{item.icon}</div>
                            <h3 className={styles.carouselTitle}>{item.title}</h3>
                        </div>
                    ))}
                </Slider>
            </div>

            {/* Третий Блок */}
            <div className={styles.thirdBlock}>
                <img src={homeImage3} alt="Третий блок" className={styles.homeImage3} />
            </div>

            {/* Четвертый Блок - Тарифы */}
            <div className={styles.fourthBlock} id="tariffs">
                <h2 className={styles.tariffsTitle}>Наши тарифы</h2>
                <div className={styles.tariffsContainer}>
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
        </div>
    );
};

export default Home;
