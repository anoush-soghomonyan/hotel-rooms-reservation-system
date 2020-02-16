import React from 'react';
import VerticalTabs from "./VerticalTabs";
import DataManager from "../managers/DataManager";

export default function MainComponent() {
    return <div className="main-wrap">
        <header>
            <h1>Hotel rooms reservation system</h1>
            <span onClick={() => DataManager.sharedInstance().logout()}>Log out</span>
        </header>
        <VerticalTabs/>
    </div>
}