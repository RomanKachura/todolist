import React from 'react';
import s from './App.module.css';
import {AppBar, Button, Toolbar} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../store/store';
import {logoutThunk} from '../../store/reducers/authReducer';
import {AppRouter} from '../navigation/AppRouter';

export const App: React.FC = () => {
    const isAuth = useSelector<RootState, boolean>(state => state.auth.isAuth);
    const dispatch = useAppDispatch();
    const onClickHandler = () => {
        dispatch(logoutThunk());
    };
    return (
        <div className={s.app}>
            <AppBar className={s.header} position="fixed" color={'primary'}>
                <Toolbar>
                    {isAuth && <Button color="inherit" onClick={onClickHandler}>Logout</Button>}
                </Toolbar>
            </AppBar>

            <div className={s.content}>
                <AppRouter/>
            </div>
        </div>
    )
}
