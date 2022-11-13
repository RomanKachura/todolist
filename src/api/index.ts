import axios, {AxiosRequestConfig} from 'axios';

export const $api = axios.create({
    baseURL: 'http://localhost:3010/',
    withCredentials: true
});

$api.interceptors.request.use((config: AxiosRequestConfig) => {
    const app = localStorage.getItem('app');
    if (app) {
        const token = JSON.parse(app.toString()).auth.data.accessToken;
        config.headers = {
            Authorization: `Bearer ${token}`
        }
        return config;
    }
});