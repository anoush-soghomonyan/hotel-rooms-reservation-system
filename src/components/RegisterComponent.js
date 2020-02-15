import React from 'react';
import PropTypes from 'prop-types';
import {ProgressIcon} from "./common/Icons";
import LoginInput from "./common/LoginInput";

function RegisterComponent() {
    let error_message = null;
    let should_show_indicator = null;

    const onUsernameChange = () => {

    };

    const onPinChange = () => {

    };

    const onConfirmChange = () => {

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
                >Register now</button>
            }
        </span>
    </div>
}

export default RegisterComponent;