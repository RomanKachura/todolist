import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from './AppDescribe.module.css';
import {IconButton, TextField} from '@material-ui/core';
import {Done, Edit, KeyboardArrowDown} from '@material-ui/icons';
import {showCorrectDate} from '../../../exeption/exeption';

export const AppDescribe: React.FC<AppDescribePropsType> = ({checked, describe, changeDescribeCallBack, createAt}) => {
    const [editMode, setEditMode] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(describe);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValue(e.currentTarget.value);
    const onKeyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') changeDescribe();
        if (e.key === 'Escape') setValue('');
    }
    const changeDescribe = () => {
        if (value.length > 0 && value.length < 301) {
            changeDescribeCallBack(value);
            setEditMode(false);
        }
    };

    return (
        <div className={s.appDescribe}>
            <div className={s.appDescribeHeader}>
                <h4 className={open ? `${s.appDescribeTitle} ${s.appDescribeTitleOpen}` : s.appDescribeTitle}>
                    {!!describe ? describe.slice(0, 15) : 'Describe'}
                </h4>
                <div className={s.buttonBlock}>
                    {open &&
                        <IconButton
                            disabled={checked}
                            onClick={() => setEditMode(!editMode)}
                            color={editMode ? 'primary' : 'default'}
                        >
                            {!editMode ? <Edit/> : <Done/>}
                        </IconButton>}
                    <IconButton onClick={() => setOpen(!open)} color={open ? 'secondary' : 'primary'}>
                        <KeyboardArrowDown
                            className={open ? `${s.icon} ${s.openIcon}` : `${s.icon}`}
                        />
                    </IconButton>
                </div>
            </div>
            <div className={open ? `${s.appDescribeBody} ${s.appDescribeBodyOpen}` : s.appDescribeBody}>
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

type AppDescribePropsType = {
    createAt: string
    checked: boolean
    describe: string
    changeDescribeCallBack: (describe: string) => void
}