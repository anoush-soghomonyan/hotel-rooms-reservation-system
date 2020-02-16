import React from 'react';
import VerticalTabs from "./VerticalTabs";
import StorageFactory from "../backend/StorageFactory";

export default function MainComponent() {
    return <div className="main-wrap">
        <header>
            <h1>Hotel rooms reservation system</h1>
            <span onClick={() => StorageFactory.clearAllStorageData()}>Log out</span>
        </header>
        <VerticalTabs/>
    </div>
}