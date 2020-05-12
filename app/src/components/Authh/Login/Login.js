import React from 'react'
import { useForm } from 'react-hook-form';

import classes from "./Login.module.css"

const Login = props => {
    const { register, handleSubmit, errors } = useForm();
    const { onSwitchState } = props;
    const mailInputBorder = errors.Email ? classes.errorInput : classes.input
    const passwordInputBorder = errors.Password ? classes.errorInput : classes.input

    return (
        <form className={classes.form} onSubmit={handleSubmit(props.onSubmit)}>
            <h1 className={classes.headerText}>Welcome, back.</h1>
            <input
                className={mailInputBorder}
                type="text"
                placeholder="Email"
                name="Email"
                ref={register({ required: true, pattern: /^\S+@\S+$/i })}
            />
            <input
                className={passwordInputBorder}
                type="password"
                placeholder="Password"
                name="Password"
                ref={register({ required: true })}
            />
        
            <div className={classes.text} >{props.errorMessage}</div>
            <button
                className={classes.submitButton}
                type="submit">
                Log in
            </button>
            <div className={classes.text} onClick={onSwitchState}>Don't you have an account?</div>
        </form>
    )
}

export default Login

