import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {RouterPath} from "../../utils/constants";
import DataManager from "../../managers/DataManager";

export const PrivateRoute = ({ component: Component, ...rest }) => <Route
    {...rest}
    render={(props) => DataManager.sharedInstance().user
        ? <Component {...props} />
        : <Redirect to={RouterPath.Login} />
    }
/>;
