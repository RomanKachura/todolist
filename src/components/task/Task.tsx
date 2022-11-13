import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {Remove} from '@material-ui/icons';
import s from './Task.module.css';
import {AppTitle} from '../feature/appTitle/AppTitle';
import {TaskDataType} from '../../store/reducers/todolistReducer';

export const Task: React.FC<TaskPropsType> = (
    {_id, title, describe, isDone, createAt, removeTaskCallBack, updateTaskCallBack}
) => {
    const removeTask = () => removeTaskCallBack(_id);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => updateTaskCallBack(_id, title, e.currentTarget.checked);
    const changeTitle = (title: string) => updateTaskCallBack(_id, title, isDone);
    return (
        <div className={s.task}>
            <Checkbox style={{marginRight: '10px'}} checked={isDone} onChange={onChangeHandler} color="primary"/>
            <AppTitle checked={isDone} title={title} callBack={changeTitle}/>
            <IconButton color="secondary" onClick={removeTask}>
                <Remove color="secondary"/>
            </IconButton>
        </div>
    )
}

export type TaskPropsType = TaskDataType & {
    removeTaskCallBack: (id: string) => void
    updateTaskCallBack: (id: string, title: string, isDone: boolean) => void
}