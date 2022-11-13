import React, {useEffect} from 'react';
import {Grid} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../store/store';
import {Navigate} from 'react-router-dom';
import {
    addTaskThunk,
    addTodoListThunk,
    changeTodoListTitleThunk,
    getTodoListsThunk,
    removeTaskThunk,
    removeTodoListThunk,
    TodoListDataType,
    updateTaskThunk
} from '../../store/reducers/todolistReducer';
import {TodoList} from './TodoList';
import {AddItem} from '../feature/addItem/AddItem';
import {AuthResponseType} from '../../api/authApi';

export const TodoListContainer: React.FC = () => {
    const isAuth = useSelector<RootState, boolean>(state => state.auth.isAuth);
    const authData = useSelector<RootState, AuthResponseType>(state => state.auth.data)
    const todolists = useSelector<RootState, TodoListDataType[]>(state => state.todolist.data);
    const dispatch = useAppDispatch();

    const addTodoList = (title: string) => dispatch(addTodoListThunk({title, todolists: authData.user.todolists}));


    const removeTodoList = (id: string) => dispatch(removeTodoListThunk({id, todolists: authData.user.todolists}));


    const changeTodoListTitle = (id: string, title: string) => dispatch(changeTodoListTitleThunk({
        id,
        title,
        todolists: authData.user.todolists
    }));


    const addTask = (tid: string, title: string) => dispatch(addTaskThunk({
        todolists: authData.user.todolists,
        tid,
        title
    }));


    const removeTask = (tid: string, id: string) => dispatch(removeTaskThunk({
        todolists: authData.user.todolists,
        tid,
        id
    }));

    const updateTask = (tid: string, id: string, title: string, isDone: boolean) => dispatch(updateTaskThunk({
        todolists: authData.user.todolists,
        tid,
        id,
        title,
        isDone
    }))

    useEffect(() => {
        if (authData) {
            dispatch(getTodoListsThunk({todolists: authData.user.todolists}));
        }
    }, []);

    if (!isAuth) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            <Grid container spacing={2} style={{width: '100%', padding: '50px'}}>
                <AddItem callBack={addTodoList}/>
                <Grid container spacing={5} style={{width: '100%', padding: '50px 0', flexWrap: 'nowrap'}}>
                    {todolists.map(t =>
                        <TodoList
                            key={t._id}
                            tid={t._id}
                            todolists={authData.user.todolists}
                            title={t.title}
                            tasks={t.tasks}
                            removeTodoListCallBack={removeTodoList}
                            changeTodoListTitleCallBack={changeTodoListTitle}
                            addTaskCallBack={addTask}
                            removeTaskCallBack={removeTask}
                            updateTaskCallBack={updateTask}
                        />)
                    }
                </Grid>
            </Grid>
        </>
    )
}