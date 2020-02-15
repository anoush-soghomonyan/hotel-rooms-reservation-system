import React from "react";
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";

function LoginWrapComponent() {
    return <div className='login-wrapper'>
        <div className='header'>
            <LoginComponent />
        </div>
        <div className='register'>
            <RegisterComponent />
        </div>
    </div>
}

export default LoginWrapComponent;