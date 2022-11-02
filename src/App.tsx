import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import {Task} from './Task';

function App() {
    const [todolists, setTodolist]: any[] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [value, setValue] = useState('');
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const addTask = (tID: string) => {
        axios.post(`http://localhost:3010/todolist/${tID}`, {title: newTaskTitle});
    }
    const getOneTask = (tlID: string) => {
        axios.get(`http://localhost:3010/todolist/${tlID}/tasks/6333407090a135f319f23023`).then(res => {
            console.log(res);
        });
    }
    const getTodolist = () => {
        axios.get('http://localhost:3010/todolists').then(res => {
            setTodolist(res.data);
        });
    }

    const addTodolist = () => {
        axios.post('http://localhost:3010/todolists', {title: 'td2'})
            .then(res => {
                getTodolist();
            })
            .catch(rej => {
                console.log(rej);
            });
    }

    const deleteTodolist = (id: any) => {
        axios.delete(`http://localhost:3010/todolists/${id}`)
            .then(res => {
                getTodolist();
            })
            .catch(rej => {
                console.log(rej);
            });
    }

    const updateTodoList = (id: any, title: any) => {
        axios.put(`http://localhost:3010/todolists/${id}`, {title})
            .then(res => {
                getTodolist();
                setIsEditMode(false);
            })
            .catch(rej => {
                console.log(rej);
            })
    }

    useEffect(() => {
        getTodolist();
        getOneTask('6333402790a135f319f23022');
    }, [])

    return (
        <div className="App">
            <div>
                <button onClick={addTodolist}>click</button>
            </div>
            {todolists.map((t: any) => <div
                style={{border: '1px solid #000', padding: '20px', width: '300px', margin: '10px auto'}}
                key={t._id} id={t._id}>
                <div>
                    <input value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.currentTarget.value)}/>
                    <button onClick={() => addTask(t._id)}>+</button>
                </div>
                {
                    !isEditMode
                        ? <div>
                            <h3 onDoubleClick={() => setIsEditMode(true)}>{t.title}</h3>
                            {t.tasks.map((m: any) => <Task key={m._id} tID={t._id} id={m._id} title={m.title}
                                                           isDone={m.isDone}/>)}
                        </div>
                        : <div>
                            <input value={value} onChange={(e) => setValue(e.currentTarget.value)}/>
                            <button onClick={() => updateTodoList(t._id, value)}>v</button>
                        </div>
                }
                <button onClick={() => deleteTodolist(t._id)}>x</button>
            </div>)}
        </div>
    );
}

export default App;
