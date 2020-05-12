import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as authActions from '../store/actions/authActions'

import Authh from '../components/Authh/Authh'

const AuthContainer = props => {

    const [switchState, setSwitchState] = useState(true);
    const [file, setFile] = useState('');

    const handleSwitch = () => {
        setSwitchState(curr => !curr);
    }

    const onSubmit = (data) => {
        switchState ?
            props.onLogin(data) :
            props.onRegister(data,file)
    }

    return (
        <>
            <Authh
                isAuthenticated={props.auth.isAuthenticated}
                onSwitchState={handleSwitch}
                onSubmit={onSubmit}
                errorMessage={props.auth.error}
                switchState={switchState}
                setFile={setFile}
                file={file}>
            </Authh>
        </>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
})

const mapDispatchToProps = dispatch => {
    return {
        onRegister: (name, email, password,file) => dispatch(authActions.registerUser(name, email, password,file)),
        onLogin: (email, password) => dispatch(authActions.loginUser(email, password)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer)
