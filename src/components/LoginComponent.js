import React from 'react';
import {ProgressIcon} from "./common/Icons";
import {withRouter} from 'react-router-dom';
import LoginInput from "./common/LoginInput";
import {RouterPath} from "../utils/constants";
import DataManager from "../managers/DataManager";

function LoginComponent({history}) {
    let username = "",
        password = "",
        error_message = null,
        should_show_indicator = null;

    const onLoginChange = (e) => {
        username = e.target.value;
    };

    const onPasswordChange = (e) => {
        password = e.target.value;
    };

    const onLoginClick = (e) => {
        DataManager.sharedInstance().login({username: username, password: password}, (err, res) => {
            if(err) {
                alert(err.message);
            } else {
                history.push(RouterPath.AdminPanel)
            }
        })
    };

    return <div className='login'>
        <LoginInput
            type="text"
            className='username'
            placeholder="Username"
            onChange={onLoginChange}
            errorMessage={error_message}
        />
        <LoginInput
            type="password"
            className='pass'
            placeholder="Password"
            onChange={onPasswordChange}
            errorMessage={error_message}
        />
        {should_show_indicator
            ? <span className='log-button-wrap'>
                <ProgressIcon size='32'/>
            </span>
            : <button
                className='reg-button'
                onClick={onLoginClick}
            >Log in</button>
        }
    </div>
}

export default withRouter(LoginComponent);