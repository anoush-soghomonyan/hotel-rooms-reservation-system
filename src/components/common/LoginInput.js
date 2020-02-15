import React from 'react';

function LoginInput({errorMessage, className, onChange, placeholder, type}) {
    return <span
        className={`reg-input ${className || ""}`}
        style={{border: errorMessage ? "red" : ""}}
    >
        <input
            type={type}
            placeholder={placeholder}
            onChange={(e) => onNumberChange(e)}
        />
        {errorMessage && <span className="login-err-text">Wrong username or password</span>}
    </span>;

    function onNumberChange(e) {
        if(onChange) {
            onChange(e);
        }
    }
}

export default LoginInput;