import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { useForm } from 'react-hook-form';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token, loading, error } = useSelector((state) => state.auth);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        dispatch(loginUser(data));
    };

    React.useEffect(() => {
        if (token) {
            navigate('/search');
        }
    }, [token, navigate]);

    return (
        <div className={styles.loginContainer}>
            <h1>Вход в аккаунт</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="login">Логин*</label>
                    <input
                        type="text"
                        id="login"
                        {...register('login', { required: 'Логин обязателен' })}
                        autoComplete="username"
                        className={errors.login ? styles.errorInput : ''}
                    />
                    {errors.login && <span className={styles.error}>{errors.login.message}</span>}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Пароль*</label>
                    <input
                        type="password"
                        id="password"
                        {...register('password', { required: 'Пароль обязателен' })}
                        autoComplete="current-password"
                        className={errors.password ? styles.errorInput : ''}
                    />
                    {errors.password && <span className={styles.error}>{errors.password.message}</span>}
                </div>
                <button type="submit" disabled={loading} className={styles.submitButton}>
                    {loading ? 'Вход...' : 'Войти'}
                </button>
                {error && <div className={styles.error}>{error.message || 'Ошибка авторизации'}</div>}
            </form>
            <div className={styles.additionalLinks}>
                <Link to="/register">Зарегистрироваться</Link>
                <Link to="/forgot-password">Восстановить пароль</Link>
                {/* Кнопки для входа через Google/Facebook/Яндекс */}
            </div>
        </div>
    );
};

export default Login;
