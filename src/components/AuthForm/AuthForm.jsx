import React, { useState, useEffect } from 'react';
import styles from './AuthForm.module.css';
import { Link, useNavigate } from 'react-router-dom';
import googleIcon from '../../assets/images/google.svg';
import facebookIcon from '../../assets/images/facebook.svg';
import yandexIcon from '../../assets/images/yandex.svg';
import keysImage from '../../assets/images/keys.png'; // Добавляем keys.png
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, fetchUserInfo, fetchLimits } from '../../redux/slices/authSlice';

const AuthForm = () => {
    const [activeTab, setActiveTab] = useState('login'); // 'login' или 'register'
    const [loginData, setLoginData] = useState({
        login: '',
        password: '',
    });
    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { token, loading, error } = useSelector((state) => state.auth);

    useEffect(() => {
        if (token) {
            // Если пользователь авторизован, перенаправить на главную
            navigate('/');
        }
    }, [token, navigate]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setLoginData({ login: '', password: '' });
        setRegisterData({ username: '', email: '', password: '', confirmPassword: '' });
    };

    const handleLoginInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRegisterInputChange = (e) => {
        const { name, value } = e.target;
        setRegisterData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser(loginData));
    };

    const handleRegister = (e) => {
        e.preventDefault();
    };

    const isLoginButtonDisabled = !loginData.login || !loginData.password;
    const isRegisterButtonDisabled =
        !registerData.username ||
        !registerData.email ||
        !registerData.password ||
        !registerData.confirmPassword;

    return (
        <div className={styles.overlay}>
            <div className={styles.authFormContainer}>
                <img src={keysImage} alt="Люди с ключами" className={styles.keysImage} />
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'login' ? styles.active : ''}`}
                        onClick={() => handleTabClick('login')}
                    >
                        Войти
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'register' ? styles.active : ''}`}
                        onClick={() => handleTabClick('register')}
                    >
                        Зарегистрироваться
                    </button>
                </div>

                {activeTab === 'login' && (
                    <form className={styles.form} onSubmit={handleLogin}>
                        <label className={styles.label}>
                            Логин или номер телефона:
                            <input
                                type="text"
                                name="login"
                                value={loginData.login}
                                onChange={handleLoginInputChange}
                                className={styles.input}
                                placeholder="Введите логин или номер телефона"
                                required
                            />
                        </label>
                        <label className={styles.label}>
                            Пароль:
                            <input
                                type="password"
                                name="password"
                                value={loginData.password}
                                onChange={handleLoginInputChange}
                                className={styles.input}
                                placeholder="Введите пароль"
                                required
                            />
                        </label>
                        {error && <p className={styles.error}>{error}</p>}
                        <button
                            type="submit"
                            className={`${styles.submitButton} ${isLoginButtonDisabled ? styles.disabled : ''}`}
                            disabled={isLoginButtonDisabled || loading}
                        >
                            {loading ? 'Вход...' : 'Войти'}
                        </button>
                        <Link to="/restore-password" className={styles.restorePassword}>
                            Восстановить пароль
                        </Link>
                        <div className={styles.divider}>Войти через:</div>
                        <div className={styles.socialButtons}>
                            <button className={styles.socialButton}>
                                <img src={googleIcon} alt="Google" />
                            </button>
                            <button className={styles.socialButton}>
                                <img src={facebookIcon} alt="Facebook" />
                            </button>
                            <button className={styles.socialButton}>
                                <img src={yandexIcon} alt="Yandex" />
                            </button>
                        </div>
                    </form>
                )}

                {activeTab === 'register' && (
                    <form className={styles.form} onSubmit={handleRegister}>
                        <label className={styles.label}>
                            Имя пользователя:
                            <input
                                type="text"
                                name="username"
                                value={registerData.username}
                                onChange={handleRegisterInputChange}
                                className={styles.input}
                                placeholder="Введите имя пользователя"
                                required
                            />
                        </label>
                        <label className={styles.label}>
                            Электронная почта:
                            <input
                                type="email"
                                name="email"
                                value={registerData.email}
                                onChange={handleRegisterInputChange}
                                className={styles.input}
                                placeholder="Введите электронную почту"
                                required
                            />
                        </label>
                        <label className={styles.label}>
                            Пароль:
                            <input
                                type="password"
                                name="password"
                                value={registerData.password}
                                onChange={handleRegisterInputChange}
                                className={styles.input}
                                placeholder="Введите пароль"
                                required
                            />
                        </label>
                        <label className={styles.label}>
                            Подтвердите пароль:
                            <input
                                type="password"
                                name="confirmPassword"
                                value={registerData.confirmPassword}
                                onChange={handleRegisterInputChange}
                                className={styles.input}
                                placeholder="Подтвердите пароль"
                                required
                            />
                        </label>
                        <button
                            type="submit"
                            className={`${styles.submitButton} ${isRegisterButtonDisabled ? styles.disabled : ''}`}
                            disabled={isRegisterButtonDisabled}
                        >
                            Зарегистрироваться
                        </button>
                        <div className={styles.divider}>Зарегистрироваться через:</div>
                        <div className={styles.socialButtons}>
                            <button className={styles.socialButton}>
                                <img src={googleIcon} alt="Google" />
                            </button>
                            <button className={styles.socialButton}>
                                <img src={facebookIcon} alt="Facebook" />
                            </button>
                            <button className={styles.socialButton}>
                                <img src={yandexIcon} alt="Yandex" />
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AuthForm;
