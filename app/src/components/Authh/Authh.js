import React from 'react'
import { Redirect } from 'react-router'

import classes from './Authh.module.css'
import Login from './Login/Login'
import Register from './Register/Register'

const Authen = props => {
    return (
        <>
            {props.isAuthenticated ? <Redirect to={"/"}></Redirect> : null}
            <div className={classes.flexContainer}>
                <div className={classes.centerContainer}>
                    <div className={classes.leftContainer}>
                        <div className={classes.authContainer}>
                            {props.switchState ?
                                <Login
                                    onSwitchState={props.onSwitchState}
                                    onSubmit={props.onSubmit}
                                    errorMessage={props.errorMessage}>
                                </Login> :
                                <Register
                                    onSwitchState={props.onSwitchState}
                                    onSubmit={props.onSubmit}
                                    errorMessage={props.errorMessage}
                                    setFile={props.setFile}
                                    file={props.file}>
                                </Register>
                            }
                        </div>
                    </div>
                    <div className={classes.rightContainer}>
                        <img className={classes.imageContainer} src={require("../../assets/svg/hire.svg")} alt=""></img>

                    </div>
                </div>
            </div>
        </>

    )
}

export default Authen
