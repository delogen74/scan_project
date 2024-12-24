import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, fetchUserInfo, fetchLimits } from '../../redux/slices/authSlice';
import styles from './Header.module.css';
import logo from '../../assets/images/logo.svg';
import avatar from '../../assets/images/avatar.svg';
import Loader from '../Loader/Loader';
import LimitsPanel from '../LimitsPanel/LimitsPanel';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token, userInfo, loading, limits, loadingLimits, errorLimits } = useSelector((state) => state.auth);

    useEffect(() => {
        if (token) {
            dispatch(fetchUserInfo());
            dispatch(fetchLimits());
        }
    }, [dispatch, token]);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <Link to="/" className={styles.logo}>
                    <img src={logo} alt="Логотип СКАН" />
                </Link>
            </div>
            <div className={styles.center}>
                <Link to="/" className={styles.navLink}>Главная</Link>
                <Link to="/tariffs" className={styles.navLink}>Тарифы</Link>
                <Link to="/faq" className={styles.navLink}>FAQ</Link>
                <button
                    onClick={() => navigate('/search')}
                    className={`${styles.navLink} ${styles.searchButton}`}
                >
                    Поиск
                </button>
            </div>
            <div className={styles.right}>
                {!token ? (
                    <>
                        <Link to="/register" className={styles.registerButton}>Зарегистрироваться</Link>
                        <div className={styles.divider}></div>
                        <Link to="/login" className={styles.loginButton}>Войти</Link>
                    </>
                ) : (
                    <div className={styles.userPanel}>
                        <LimitsPanel loading={loadingLimits} error={errorLimits} limits={limits} />
                        <div className={styles.userInfo}>
                            <img src={avatar} alt="Аватар" className={styles.avatar} />
                            <span className={styles.username}>{userInfo?.name || 'Пользователь'}</span>
                            <button onClick={handleLogout} className={styles.logoutButton}>Выйти</button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
