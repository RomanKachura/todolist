import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {todolistApi} from '../../api/todolistApi';
import {taskApi} from '../../api/taskApi';

export type TodolistReducerState = {
    data: TodoListDataType[]
}

const initialState: TodolistReducerState = {
    data: []
};


//Thunks for work with TodoLists
export const getTodoListsThunk = createAsyncThunk('get-todolists', async (arg: { todolists: string }, thunkAPI) => {
    try {
        const tl = await todolistApi.getTodoLists(arg.todolists);
        thunkAPI.dispatch(setTodoListsAction(tl.data));
    } catch (e) {
        throw e;
    }
});
export const addTodoListThunk = createAsyncThunk('add-todolist', async (arg: { title: string, todolists: string }, thunkAPI) => {
    try {
        const tl = await todolistApi.addTodoList(arg.title, arg.todolists);
        thunkAPI.dispatch(setTodoListsAction(tl.data));
    } catch (e) {
        throw e;
    }
});
export const removeTodoListThunk = createAsyncThunk('remove-todolist', async (arg: { id: string, todolists: string }, thunkAPI) => {
    try {
        const tl = await todolistApi.removeTodoList(arg.id, arg.todolists);
        thunkAPI.dispatch(setTodoListsAction(tl.data));
    } catch (e) {
        throw e;
    }
});
export const changeTodoListTitleThunk = createAsyncThunk('change-todolist-title', async (arg: { id: string, title: string, todolists: string }, thunkAPI) => {
    try {
        const tl = await todolistApi.changeTodoListTitle(arg.id, arg.title, arg.todolists);
        thunkAPI.dispatch(setTodoListsAction(tl.data));
    } catch (e) {
        throw e;
    }
});

//Thunks for work with Tasks
export const addTaskThunk = createAsyncThunk('add-task', async (arg: { todolists: string, tid: string, title: string }, thunkAPI) => {
    try {
        const tl = await taskApi.addTask({...arg});
        thunkAPI.dispatch(setTodoListsAction(tl.data));
    } catch (e) {
        throw e;
    }
});

export const removeTaskThunk = createAsyncThunk('remove-task', async (arg: { todolists: string, tid: string, id: string }, thunkAPI) => {
    try {
        const tl = await taskApi.removeTask({...arg});
        thunkAPI.dispatch(setTodoListsAction(tl.data));
    } catch (e) {
        throw e;
    }
});

export const updateTaskThunk = createAsyncThunk('remove-task', async (arg: { todolists: string, tid: string, id: string, title: string, isDone: boolean }, thunkAPI) => {
    try {
        const tl = await taskApi.updateTask({...arg});
        thunkAPI.dispatch(setTodoListsAction(tl.data));
    } catch (e) {
        throw e;
    }
});

const todolistReducer = createSlice({
    initialState,
    name: 'todolist',
    reducers: {
        setTodoListsAction(state, action) {
            state.data = action.payload;
        },
    }
});


export type TodoListDataType = {
    _id: string
    title: string
    tasks: TaskDataType[]
}

export type TaskDataType = {
    createAt: string
    describe: string
    isDone: boolean
    title: string
    _id: string
}
export const {setTodoListsAction} = todolistReducer.actions;
export default todolistReducer.reducer;