import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://gateway.scan-interfax.ru',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default instance;
