import axios, {AxiosResponse} from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3010/',
    withCredentials: true
})

export const authApi = {
    registration(data: { email: string, userName: string, password: string }) {
        return instance.post<AxiosResponse, AxiosResponse<AuthResponseType>>('api/registration', data);
    },
    login(data: { email: string, password: string }) {
        return instance.post<AxiosResponse, AxiosResponse<AuthResponseType>>('api/login', data,{});
    },
    logout() {
        return instance.delete<void>('api/logout');
    }
}

export type AuthResponseType = {
    accessToken: string
    refreshToken: string
    user: UserType
}

export type UserType = {
    id: string
    email: string
    todolists: string
    isActivated: boolean
}
