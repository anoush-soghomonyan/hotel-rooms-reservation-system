import React from 'react';
import {ProgressIcon} from "./common/Icons";
import {withRouter} from 'react-router-dom';
import LoginInput from "./common/LoginInput";
import {checkUsername} from "../utils/utils";
import {RouterPath} from "../utils/constants";
import DataManager from "../managers/DataManager";

function RegisterComponent({history}) {
    let username,
        password,
        confirmPass,
        error_message = null,
        should_show_indicator = null;

    const onUsernameChange = (e) => {
        username = e.target.value;
    };

    const onPinChange = (e) => {
        password = e.target.value;
    };

    const onConfirmChange = (e) => {
        confirmPass = e.target.value;
    };

    const handleError = () => {
        if(checkUsername(username)) {
            if(password !== confirmPass) {
                return "Passwords didn't match";
            }
        } else {
            return "Incorrect username format";
        }
    };

    const onRegisterClick = (e) => {
        let err = handleError();
        if(err) {
            alert(err);
            return;
        }
        DataManager.sharedInstance().registration({username: username, password: password}, (err, res) => {
            if(err) {
                alert(err.message || err);
            } else {
                history.push(RouterPath.AdminPanel);
            }
        })
    };

    return <div className='reg-content'>
        <span className='heading'>Create a new Admin</span>
        <span className='description'>Admin should be approved by hotel.</span>
        <LoginInput
            type="text"
            onChange={onUsernameChange}
            errorMessage={error_message}
            placeholder='Username or Email Address'
        />
        <LoginInput type="password" placeholder='Password' errorMessage={error_message} onChange={onPinChange}/>
        <LoginInput
            type="password"
            onChange={onConfirmChange}
            errorMessage={error_message}
            placeholder='Confirm password'
        />
        <span className='reg-action-btn-wrap'>
            {should_show_indicator
                ? <ProgressIcon/>
                : <button
                    className='reg-button'
                    onClick={onRegisterClick}
                >Register now</button>
            }
        </span>
    </div>
}

export default withRouter(RegisterComponent);