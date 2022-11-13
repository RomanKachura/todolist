import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Registration} from '../auth/Registration';
import {Login} from '../auth/Login';
import {TodoListContainer} from '../todolist/TodoListContainer';

export const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path={'/todolist'} element={<TodoListContainer/>}/>
            <Route path={'/registration'} element={<Registration/>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/'} element={<Navigate to={'/todolist'}/>}/>
            <Route path={'*'} element={<Navigate to={'/todolist'}/>}/>
        </Routes>
    )
}