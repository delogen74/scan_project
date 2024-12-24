import React from 'react';
import styles from './TariffCard.module.css';
import checkIcon from '../../assets/images/check.svg';
import { Link } from 'react-router-dom';

const TariffCard = ({
                        title,
                        subtitle,
                        icon,
                        price,
                        oldPrice,
                        features,
                        buttonText,
                        buttonLink,
                        backgroundColor,
                        additionalInfo,
                    }) => {
    return (
        <div className={styles.tariffCard}>
            <div className={styles.header} style={{ backgroundColor }}>
                <img src={icon} alt={`${title} icon`} className={styles.icon} />
                <div className={styles.headerText}>
                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.subtitle}>{subtitle}</p>
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.pricing}>
                    <span className={styles.price}>{price}</span>
                    {oldPrice && <span className={styles.oldPrice}>{oldPrice}</span>}
                </div>
                {additionalInfo && <p className={styles.additionalInfo}>{additionalInfo}</p>}
                <ul className={styles.features}>
                    {features.map((feature, index) => (
                        <li key={index} className={styles.featureItem}>
                            <img src={checkIcon} alt="Галочка" className={styles.checkIcon} />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <Link to={buttonLink}>
                <button className={styles.moreButton}>{buttonText}</button>
            </Link>
        </div>
    );
};

export default TariffCard;
