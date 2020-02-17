import React from 'react';
import VerticalTabs from "./VerticalTabs";
import {withRouter} from 'react-router-dom';
import Button from "@material-ui/core/Button";
import DataManager from "../managers/DataManager";
import {RouterPath} from "../utils/constants";

function MainComponent({history}) {
    const logout = () => {
        DataManager.sharedInstance().logout();
        history.push(RouterPath.Login);
    };

    const clear = () => {
        DataManager.sharedInstance().clearAllStorageData();
        history.push(RouterPath.Login);
    };

    return <div className="main-wrap">
        <header>
            <h1>Hotel rooms reservation system | Admin: {DataManager.sharedInstance().user.username}</h1>
            <span className='buttons'>
                <Button
                    color="secondary"
                    variant="outlined"
                    onClick={clear}
                >Clear All data</Button>
                <Button
                    color="secondary"
                    variant="outlined"
                    onClick={logout}
                >Log out</Button>
            </span>
        </header>
        <VerticalTabs history={history}/>
    </div>
}

export default withRouter(MainComponent);