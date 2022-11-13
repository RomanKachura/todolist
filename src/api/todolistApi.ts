import {$api} from './index';
import {AxiosResponse} from 'axios';
import {TodoListDataType} from '../store/reducers/todolistReducer';

export const todolistApi = {
    getTodoLists(todolists: string) {
        return $api.get<AxiosResponse, AxiosResponse<TodoListDataType>>(`todolists/${todolists}`);
    },

    addTodoList(title: string, todolists: string) {
        return $api.post<AxiosResponse, AxiosResponse<TodoListDataType>>(`todolists/${todolists}`, {title});
    },

    removeTodoList(id: string, todolists: string) {
        return $api.delete<AxiosResponse, AxiosResponse<TodoListDataType>>(`todolists/${todolists}/${id}`);
    },

    changeTodoListTitle(id: string, title: string, todolists: string) {
        return $api.put<AxiosResponse, AxiosResponse<TodoListDataType>>(`todolists/${todolists}/${id}`, {title});
    },
}