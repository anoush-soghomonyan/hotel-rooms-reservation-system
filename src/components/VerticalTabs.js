import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import {RouterPath} from "../utils/constants";
import {withRouter, Route} from "react-router-dom";
import NewReservationComponent from "./NewReservationComponent";
import ReservationsListComponent from "./ReservationsListComponent";

class VerticalTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
        }
    }
    componentDidMount() {
        this.props.history.push(RouterPath.New);
    }

    handleChange = (event, newValue) => {
        this.setState({value: newValue});
        if(newValue === 0) {
            this.props.history.push(RouterPath.List);
        } else if(newValue === 1) {
            this.props.history.push(RouterPath.New);
        }
    };

    render() {
        const {value} = this.state;
        return <div className="admin-main-content">
            <div className='side-bar'>
                <Paper>
                    <Tabs
                        value={value}
                        textColor="primary"
                        orientation="vertical"
                        onChange={this.handleChange}
                    >
                        <Tab label="Reservations list" />
                        <Tab label="New reservation" />
                    </Tabs>
                </Paper>
            </div>
            <div className='tab-content'>
                <Route path={RouterPath.List}><ReservationsListComponent/></Route>
                <Route path={RouterPath.New}><NewReservationComponent /></Route>
            </div>
        </div>
    }
}

export default withRouter(VerticalTabs);
