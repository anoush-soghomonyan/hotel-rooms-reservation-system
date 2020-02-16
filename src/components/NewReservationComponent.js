import React from 'react';
import DataManager from "../managers/DataManager";
import CalendarComponent from "./CalendarComponent";
import RoomsSelectComponent from "./RoomsSelectComponent";

export default class NewReservationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                start: "",
                end: "",
            }
        };
    }

    render() {
        const {data} = this.state;
        return (<div>
            <h1>Reserve room</h1>
            <form noValidate autoComplete="off">
                <CalendarComponent handleEndDate={this.handleDateEnd} handleStartDate={this.handleDateStart}/>
                {(data.start && data.end) &&
                <RoomsSelectComponent
                    rooms={DataManager.sharedInstance().rooms}
                    handleRoomSelect={this.handleSelectChange}
                />
                }
            </form>
        </div>)
    }

    handleSelectChange = (e) => {
        this.state.data.room_number = e;
        this.setState(state => ({data: state.data}));
    };

    handleDateStart = (e) => {
        this.state.data.start = e;
        let err = this.dateError();
        if(err) {
            alert(err);
        } else {
            this.setState(state => ({data: state.data}));
        }
    };

    handleDateEnd = (e) => {
        this.state.data.end = e;
        let err = this.dateError();
        if(err) {
            alert(err);
        } else {
            this.setState(state => ({data: state.data}));
        }
    };

    dateError = () => {
        const {start, end} = this.state.data;
        if(start && end && start.getTime() > end.getTime()) {
            return "End date can't be smaller than start date. Select correct dates to continue.";
        }
    }
}
