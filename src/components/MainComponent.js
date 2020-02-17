import React from 'react';
import {withRouter} from 'react-router-dom';
import VerticalTabs from "./VerticalTabs";
import DataManager from "../managers/DataManager";

function MainComponent({history}) {
    return <div className="main-wrap">
        <header>
            <h1>Hotel rooms reservation system</h1>
            <span onClick={() => DataManager.sharedInstance().logout()}>Log out</span>
        </header>
        <VerticalTabs history={history}/>
    </div>
}

export default withRouter(MainComponent);