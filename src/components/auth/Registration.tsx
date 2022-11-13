import React from 'react';
import s from './Auth.module.css';
import {Button, Paper, TextField, Typography} from '@material-ui/core';
import {RootState, useAppDispatch} from '../../store/store';
import {registrationThunk} from '../../store/reducers/authReducer';
import {Formik} from 'formik';
import {Navigate, NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {AuthResponseType} from '../../api/authApi';

export const Registration: React.FC = () => {
    const isAuth = useSelector<RootState, boolean>(state => state.auth.isAuth);
    const data = useSelector<RootState, null | AuthResponseType>(state => state.auth.data);
    const dispatch = useAppDispatch();
    if (isAuth) {
        if (data) {
            if (data.user.isActivated) {
                return <Navigate to={'/todolist'}/>
            } else {
                return <Navigate to={'/login'}/>
            }
        }

    }
    const onSubmit = () => {
        console.log('123')
    }

    return (
        <div className={s.auth}>
            <Paper className={s.container} elevation={3}>
                <Typography variant="h4" component="h2" style={{marginBottom: '20px'}}>
                    Sign Up
                </Typography>

                <Formik
                    initialValues={{email: '', userName: '', password: ''}}
                    validate={values => {
                        const errors = {email: '', userName: '', password: ''};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        } else if (!values.userName) {
                            errors.userName = 'Required';
                        }
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting}) => {

                    }}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                      }) => (
                        <form className={s.form} onSubmit={(e) => {
                            e.preventDefault();
                            dispatch(registrationThunk({...values}));
                        }}>
                            <div className={s.item}>
                                <TextField
                                    autoComplete={values.userName}
                                    required
                                    error={!!errors.userName && touched.userName}
                                    className={s.textField}
                                    label="Name"
                                    variant="outlined"
                                    type="text"
                                    name="userName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.userName}
                                />
                            </div>

                            <div className={s.item}>
                                <TextField
                                    autoComplete={values.email}
                                    required
                                    error={!!errors.email && touched.email}
                                    className={s.textField}
                                    label="Email"
                                    variant="outlined"
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                            </div>


                            <div className={s.item}>
                                <TextField
                                    autoComplete={values.password}
                                    required
                                    error={!!errors.password && touched.password}
                                    className={s.textField}
                                    label="Password"
                                    variant="outlined"
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                            </div>

                            <Button
                                disabled={isSubmitting}
                                type="submit"
                                color={'primary'}
                                variant={'outlined'}
                            >
                                Sign Up
                            </Button>

                            <NavLink className={s.link} to={'/login'}>Do you have an account?</NavLink>
                        </form>
                    )}
                </Formik>
            </Paper>
        </div>
    );
};