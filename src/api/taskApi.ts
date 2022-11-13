import {$api} from './index';
import {AxiosResponse} from 'axios';
import {TodoListDataType} from '../store/reducers/todolistReducer';

export const taskApi = {
    addTask(data: { todolists: string, tid: string, title: string }) {
        const {todolists, tid, title} = data;
        return $api.post<AxiosResponse, AxiosResponse<TodoListDataType>>(`todolist/${todolists}/${tid}`, {title});
    },
    removeTask(data: { todolists: string, tid: string, id: string }) {
        const {todolists, tid, id} = data;
        return $api.delete(`todolist/${todolists}/${tid}/tasks/${id}`);
    },
    updateTask(data: { todolists: string, tid: string, id: string, title: string, isDone: boolean }) {
        const {todolists, tid, id, title, isDone} = data;
        return $api.put(`todolist/${todolists}/${tid}/tasks/${id}`, {title, isDone});
    }
}