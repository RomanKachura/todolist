import React from 'react';
import s from './App.module.css';
import {AppRouter} from '../navigation/AppRouter';
import {Header} from '../header/Header';

export const App: React.FC = () => {
    return (
        <div className={s.app}>
            <Header/>

            <div className={s.content}>
                <AppRouter/>
            </div>
        </div>
    )
}
