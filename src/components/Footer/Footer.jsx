import React from 'react';
import styles from './Footer.module.css';
import logo2 from '../../assets/images/logo2.svg';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.left}>
                <img src={logo2} alt="Логотип" className={styles.logo} />
            </div>
            <div className={styles.right}>
                <p className={styles.contactInfo}>
                    г. Москва, Цветной б-р, 40 +7 495 771 21 11 info@skan.ru
                </p>
                <p className={styles.copyRight}>Copyright. 2022</p>
            </div>
        </footer>
    );
};

export default Footer;
