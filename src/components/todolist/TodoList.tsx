import React, {useState} from 'react';
import {Task} from '../task/Task';
import {Button, Grid, IconButton, Paper} from '@material-ui/core';
import s from './TodoList.module.css';
import {Clear} from '@material-ui/icons';
import {AppTitle} from '../feature/appTitle/AppTitle';
import {AddItem} from '../feature/addItem/AddItem';
import {TaskDataType} from '../../store/reducers/todolistReducer';

export const TodoList: React.FC<TodoListPropsType> = (
    {
        todolists,
        tid,
        title,
        tasks,
        removeTodoListCallBack,
        changeTodoListTitleCallBack,
        addTaskCallBack,
        removeTaskCallBack,
        updateTaskCallBack,
    }
) => {
    const [filter, setFilter] = useState<FilterType>('ALL');
    const removeTodoList = () => removeTodoListCallBack(tid);
    const changeTodoListTitle = (title: string) => changeTodoListTitleCallBack(tid, title);
    const addTask = (title: string) => addTaskCallBack(tid, title);
    const removeTask = (id: string) => removeTaskCallBack(tid, id);
    const updateTask = (id: string, title: string, describe: string, isDone: boolean) => updateTaskCallBack(tid, id, title, describe, isDone);
    let filterTasks: TaskDataType[] = tasks;
    if (filter === 'COMPLETE') filterTasks = tasks.filter(t => t.isDone);
    if (filter === 'ACTIVE') filterTasks = tasks.filter(t => !t.isDone);
    return (
        <Grid item className={s.todolist}>
            <Paper className={s.paper}>
                <div className={s.header}>
                    <AppTitle checked={tasks.length === tasks.filter(t => t.isDone === true).length} title={title}
                              callBack={changeTodoListTitle}/>
                </div>
                <div className={s.deleteButton}>
                    <IconButton onClick={removeTodoList} color="secondary">
                        <Clear color="secondary"/>
                    </IconButton>
                </div>
                <AddItem
                    textFieldClassName={s.input}
                    className={s.addItem}
                    callBack={addTask}
                />
                <div>
                    {
                        filterTasks.map(t =>
                            <Task
                                key={t._id}
                                {...t}
                                removeTaskCallBack={removeTask}
                                updateTaskCallBack={updateTask}
                            />)
                    }
                </div>
                {
                    tasks.length > 0 &&
                    <div className={s.buttonBlock}>
                        <Button
                            onClick={() => setFilter('ALL')}
                            color="inherit"
                            variant={filter === 'ALL' ? 'contained' : 'outlined'}
                        >All
                        </Button>
                        <Button
                            onClick={() => setFilter('COMPLETE')}
                            color="primary"
                            variant={filter === 'COMPLETE' ? 'contained' : 'outlined'}
                        >Complete
                        </Button>
                        <Button
                            onClick={() => setFilter('ACTIVE')}
                            color="secondary"
                            variant={filter === 'ACTIVE' ? 'contained' : 'outlined'}
                        >Active
                        </Button>
                    </div>
                }
            </Paper>
        </Grid>
    )
}

type TodoListPropsType = {
    todolists: string
    tid: string
    title: string
    tasks: TaskDataType[]
    removeTodoListCallBack: (id: string) => void
    changeTodoListTitleCallBack: (id: string, title: string) => void
    addTaskCallBack: (tid: string, title: string) => void
    removeTaskCallBack: (tid: string, id: string) => void
    updateTaskCallBack: (tid: string, id: string, title: string, describe: string, isDone: boolean) => void
}

type FilterType = 'ALL' | 'ACTIVE' | 'COMPLETE';