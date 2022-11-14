import {IconButton, TextField} from '@material-ui/core';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {AddCircle} from '@material-ui/icons';
import s from './AddItem.module.css';

export const AddItem: React.FC<AddItemPropsType> = ({callBack, className, textFieldClassName}) => {
    const [value, setValue] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    }

    const onClickHandler = () => {
        if (value.length < 51) {
            callBack(value);
            setValue('');
        }
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') onClickHandler();
        if (e.key === 'Escape') setValue('');
    }
    return (
        <div className={`${className} ${s.addItem}`}>
            <TextField
                error={value.length > 50}
                className={`${textFieldClassName} ${s.input}`}
                label="Title"
                variant="outlined"
                type="text"
                name="title"
                onChange={handleChange}
                value={value}
                onKeyDown={onKeyPressHandler}
            />
            <IconButton
                color={'primary'}
                disabled={!value}
                onClick={onClickHandler}
            >
                <AddCircle/>
            </IconButton>
        </div>
    )
}

type AddItemPropsType = {
    className?: string
    textFieldClassName?: string
    callBack: (title: string) => void
}