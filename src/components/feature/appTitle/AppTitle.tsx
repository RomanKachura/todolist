import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {TextField} from '@material-ui/core';
import s from './AppTitle.module.css';

export const AppTitle: React.FC<AppTitlePropsType> = ({title, callBack, checked}) => {
    const [editMode, setEditMode] = useState(false);
    const [value, setValue] = useState(title);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    };
    const changeTodoListTitle = () => {
        if (value.length > 0 && value.length < 51) {
            callBack(value);
            setEditMode(false);
        } else {
            setValue(title);
            setEditMode(false);
        }
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') changeTodoListTitle();
        if (e.key === 'Escape') setValue('');
    }
    return (
        <div className={s.appTitle}>
            {!editMode
                ? <h3 className={checked ? s.checkedTask : ''} onDoubleClick={() => setEditMode(true)}>
                    {title.length > 15 ? `${title.slice(0,15)}...` : title}
            </h3>
                : <TextField
                    autoFocus
                    error={value.length < 1 || value.length > 50}
                    value={value}
                    onChange={onChangeHandler}
                    onBlur={changeTodoListTitle}
                    onKeyDown={onKeyPressHandler}
                />
            }
        </div>
    )
}

type AppTitlePropsType = {
    title: string
    checked?: boolean
    callBack: (value: string) => void
}