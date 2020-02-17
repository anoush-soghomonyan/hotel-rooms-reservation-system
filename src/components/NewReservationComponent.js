import React from 'react';
import {withRouter} from 'react-router-dom';
import {RouterPath} from "../utils/constants";
import Button from "@material-ui/core/Button";
import DataManager from "../managers/DataManager";
import CalendarComponent from "./CalendarComponent";
import RoomsSelectComponent from "./RoomsSelectComponent";

class NewReservationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.reserve = props.item;
        this.state = {
            end: this.reserve.end || "",
            start: this.reserve.start || "",
            rooms: [],
            room_number: this.reserve.room_number || null,
        };
    }

    render() {
        const {start, end, room_number} = this.state;
        return <div className='new-reserve'>
            <div className='section header'>
                <h1>Reserve room</h1>
                <Button
                    disabled={!start || !end || !room_number}
                    color="secondary"
                    variant="outlined"
                    onClick={this.onReservationClick}
                >
                    Reserve now
                </Button>
            </div>
            <div className='section'>
                <CalendarComponent handleEndDate={this.handleDateEnd} handleStartDate={this.handleDateStart}/>
            </div>
            <div className='section'>
                {(start && end) &&
                <RoomsSelectComponent
                    rooms={DataManager.sharedInstance().rooms}
                    handleSelection={this.handleSelectChange}
                />
                }
            </div>
        </div>
    }

    handleSelectChange = (e) => {
        this.setState({room_number: e});
    };

    handleDateStart = (e) => {
        this.state.start = e;
        let err = this.dateError();
        if(err) {
            alert(err);
        } else {
            this.setState({start: e});
        }
    };

    handleDateEnd = (e) => {
        this.state.end = e;
        let err = this.dateError();
        if(err) {
            alert(err);
        } else {
            this.setState({end: e});
        }
    };

    dateError = () => {
        const {start, end} = this.state;
        if(start && end && start.getTime() > end.getTime()) {
            return "End date can't be smaller than start date. Select correct dates to continue.";
        }
    };

    onReservationClick = () => {
        DataManager.sharedInstance().updateReservation({
            end: this.state.end,
            start: this.state.start,
            room_number: this.state.room_number,
        }, null, (err, res) => {
            if(err) {
                alert(err);
            } else {
                this.props.history.push(RouterPath.List);
            }
            console.log(res);
        });
    }
}

export default withRouter(NewReservationComponent);
