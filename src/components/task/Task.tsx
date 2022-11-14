import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Checkbox, IconButton, TextField} from '@material-ui/core';
import {Delete, Done, Edit, KeyboardArrowDown} from '@material-ui/icons';
import s from './Task.module.css';
import {AppTitle} from '../feature/appTitle/AppTitle';
import {TaskDataType} from '../../store/reducers/todolistReducer';
import {showCorrectDate} from '../../exeption/exeption';

// export const Task: React.FC<TaskPropsType> = (
//     {_id, title, describe, isDone, createAt, removeTaskCallBack, updateTaskCallBack}
// ) => {
//     const removeTask = () => removeTaskCallBack(_id);
//     const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => updateTaskCallBack(_id, title, describe, e.currentTarget.checked);
//     const changeTitle = (title: string) => updateTaskCallBack(_id, title, describe, isDone);
//     const changeDescribe = (describe: string) => updateTaskCallBack(_id, title, describe, isDone);
//     return (
//         <div className={s.task}>
//             <div className={s.item}>
//                 <Checkbox style={{marginRight: '10px'}} checked={isDone} onChange={onChangeHandler} color="primary"/>
//                 <AppTitle checked={isDone} title={title} callBack={changeTitle}/>
//                 <IconButton color="secondary" onClick={removeTask}>
//                     <Remove color="secondary"/>
//                 </IconButton>
//             </div>
//             <AppDescribe createAt={createAt} changeDescribeCallBack={changeDescribe} checked={isDone} describe={describe}/>
//         </div>
//     )
// }

export const Task: React.FC<TaskPropsType> = (
    {_id, title, describe, isDone, createAt, removeTaskCallBack, updateTaskCallBack}
) => {
    const [editMode, setEditMode] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(describe);
    const removeTask = () => removeTaskCallBack(_id);
    const onChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
        updateTaskCallBack(_id, title, describe, e.currentTarget.checked);
        setEditMode(false);
    };
    const changeTitle = (title: string) => updateTaskCallBack(_id, title, describe, isDone);
    const changeDescribe = () => updateTaskCallBack(_id, title, value, isDone);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValue(e.currentTarget.value);
    const onKeyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') changeDescribe();
        if (e.key === 'Escape') setValue('');
    }

    return (
        <div className={s.appDescribe}>
            <div className={s.item}>
                <Checkbox style={{marginRight: '10px'}} checked={isDone} onChange={onChangeChecked}
                          color="primary"/>
                <AppTitle checked={isDone} title={title} callBack={changeTitle}/>
                <div className={s.buttonBlock}>
                    {open &&
                        <IconButton
                            disabled={isDone}
                            onClick={() => setEditMode(!editMode)}
                            color={editMode ? 'primary' : 'default'}
                        >
                            {!editMode ? <Edit/> : <Done/>}
                        </IconButton>}
                    {!isDone ?
                        !editMode
                            ? <IconButton onClick={() => setOpen(!open)} color={open ? 'secondary' : 'primary'}>
                                <KeyboardArrowDown
                                    className={open ? `${s.icon} ${s.openIcon}` : `${s.icon}`}
                                />
                            </IconButton>
                            : <IconButton color="secondary" onClick={removeTask}>
                                <Delete color="secondary"/>
                            </IconButton>
                        : <IconButton onClick={() => setOpen(!open)} color={open ? 'secondary' : 'primary'}>
                            <KeyboardArrowDown
                                className={open ? `${s.icon} ${s.openIcon}` : `${s.icon}`}
                            />
                        </IconButton>
                    }
                </div>
            </div>
            <div className={open ? `${s.describe} ${s.describeOpen}` : s.describe}>
                {
                    !editMode
                        ? <div
                            className={!!describe ? `${s.describeBlock}` : `${s.describeBlock} ${s.describeBlockEmpty}`}>{!!describe ? describe : 'Empty'}
                        </div>
                        : <TextField
                            error={value.length < 1 || value.length > 300}
                            className={s.textArea}
                            autoFocus
                            variant={'outlined'}
                            id="outlined-multiline-static"
                            label="Describe"
                            multiline
                            value={value}
                            defaultValue={describe}
                            placeholder="Enter text"
                            onChange={onChangeHandler}
                            onKeyDown={onKeyPressHandler}
                        />
                }

                <div className={s.createAt}><small>{showCorrectDate(createAt).day}</small></div>
            </div>
        </div>
    )
}

export type TaskPropsType = TaskDataType & {
    removeTaskCallBack: (id: string) => void
    updateTaskCallBack: (id: string, title: string, describe: string, isDone: boolean) => void
}