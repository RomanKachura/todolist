import React, {useState} from 'react';
import {AppBar, Button, IconButton, Menu, MenuItem, MenuList, Paper, Toolbar, Typography} from '@material-ui/core';
import s from './Header.module.css';
import {AccountCircleRounded, MenuRounded} from '@material-ui/icons';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../store/store';
import {logoutThunk} from '../../store/reducers/authReducer';
import {NavLink} from 'react-router-dom';

export const Header: React.FC = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const isAuth = useSelector<RootState, boolean>(state => state.auth.isAuth);
    const dispatch = useAppDispatch();
    const logout = () => {
        dispatch(logoutThunk());
    };

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    }

    return (
        <AppBar className={s.header} position="fixed" color={'primary'}>
            <Toolbar className={s.toolbar}>
                {
                    isAuth &&
                    <div className={s.accountBlock}>
                        <IconButton color="inherit" onClick={toggleMenu}>
                            <MenuRounded/>
                        </IconButton>
                        <nav className={openMenu ? `${s.menu} ${s.openMenu}` : `${s.menu}`}>
                            <Paper>
                                <MenuList className={s.menuList}>
                                    <MenuItem>
                                        <NavLink onClick={toggleMenu} className={s.menuLink} to="/todolist">My
                                            todolist</NavLink>
                                    </MenuItem>
                                    <MenuItem>
                                        <NavLink onClick={toggleMenu} className={s.menuLink}
                                                 to="/setting">Setting</NavLink>
                                    </MenuItem>
                                </MenuList>
                            </Paper>
                        </nav>
                        <Typography variant="subtitle1">Roman</Typography>
                    </div>
                }
                {isAuth && <Button color="inherit" onClick={logout}>Logout</Button>}
            </Toolbar>
        </AppBar>
    )
}