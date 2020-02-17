import React from 'react';
import './styles/Reset.css';
import './styles/App.scss';
import {RouterPath} from "./utils/constants";
import DataManager from "./managers/DataManager";
import MainComponent from "./components/MainComponent";
import ProgressIndicator from "./requests/ProgressIndicator";
import {PrivateRoute} from "./components/common/PrivateRout";
import LoginWrapComponent from "./components/LoginWrapComponent";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show_progress: true,
        };
    }

    componentDidMount() {
        let dm = DataManager.sharedInstance();
        dm.autoLogin((err, res) => {
            if(!err) {
                this.user = res.user;
            }
            this.setState({show_progress: false});
        });
    }

    render() {
        return <Router>
            {this.state.show_progress
                ? <ProgressIndicator />
                : <div className="App">
                    <Redirect to={this.user ? RouterPath.AdminPanel : RouterPath.Login}/>
                    <Switch>
                        <Route path={RouterPath.Login}>
                            <LoginWrapComponent />
                        </Route>
                        <PrivateRoute path={RouterPath.AdminPanel} component={MainComponent}/>
                    </Switch>
                </div>
            }
        </Router>
    }
}
