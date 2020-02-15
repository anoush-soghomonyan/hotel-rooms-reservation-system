import React from 'react';
import {ProgressIcon} from "./common/Icons";
import LoginInput from "./common/LoginInput";

function LoginComponent() {
    let error_message = null;
    let should_show_indicator = null;

    const onLoginChange = (e) => {
        console.log(e.target.value);
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
            onChange={onLoginChange}
            errorMessage={error_message}
        />
        {should_show_indicator
            ? <span className='log-button-wrap'>
                <ProgressIcon size='32'/>
            </span>
            : <button
                className='reg-button'
                // onClick={() => this.onLoginClick()}
            >Log in</button>
        }
    </div>
}

export default LoginComponent;