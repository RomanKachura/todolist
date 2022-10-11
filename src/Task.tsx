import {ChangeEvent, useState} from 'react';
import axios from 'axios';

export const Task = ({tID, title, isDone, id, ...props}: TaskType) => {
    const [value, setValue] = useState(title);
    const [isMode, setIsMode] = useState(false);
    const onChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        const task = {
            title: value,
            isDone: e.currentTarget.checked
        }
        await axios.put(`http://localhost:3010/todolist/${tID}/tasks/${id}`, {task});
    };
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const task = {
            title: value,
            isDone: isDone
        }
        axios.put(`http://localhost:3010/todolist/${tID}/tasks/${id}`, {task});
        setIsMode(false);
    };
    const deleteTask = () => axios.delete(`http://localhost:3010/todolist/${tID}/tasks/${id}`);
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <input type="checkbox" checked={isDone} onChange={onChangeHandler}/>
            {!isMode
                ? <h4 onDoubleClick={() => setIsMode(true)}>{title}</h4>
                : <input value={value} onChange={(e) => setValue(e.currentTarget.value)} autoFocus
                         onBlur={onChangeTitle}/>
            }
            <button onClick={deleteTask}>x</button>
        </div>
    )
};

type TaskType = {
    tID: string
    id: string
    title: string
    isDone: boolean
}