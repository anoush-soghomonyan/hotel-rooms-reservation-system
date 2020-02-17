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
        // this.reserve = props.item; when comes from props with redux
        this.reserve = this.props.location.state && this.props.location.state.reservation;
        let res = this.reserve;
        this.state = {
            end: res ? res.end : "",
            start: res ? res.start : "",
            room_number: res ? res.room_number : null,
            rooms: res ? DataManager.sharedInstance().getAvailableRooms(res.start, res.end, res) : null,
        };
    }

    render() {
        const {start, end, room_number, rooms} = this.state;
        return <div className='new-reserve'>
            <div className='section header'>
                <h1>Reserve room</h1>
                <Button
                    color="secondary"
                    variant="outlined"
                    onClick={this.onCancelClick}
                >Cancel
                </Button>
                <Button
                    disabled={(!start || !end || !room_number)}
                    color="secondary"
                    variant="outlined"
                    onClick={this.onReservationClick}
                >{this.reserve ? "Edit reservation" : "Reserve now"}
                </Button>
            </div>
            <div className='section'>
                <CalendarComponent
                    end={end}
                    start={start}
                    handleEndDate={this.handleDateEnd}
                    handleStartDate={this.handleDateStart}/>
            </div>
            <div className='section'>
                {(start && end) &&
                <RoomsSelectComponent
                    rooms={rooms}
                    selectedId={room_number}
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
        if(!this.isError()) {
            this.setState({
                start: e,
                rooms: this.getRooms(),
            });
        }
    };

    handleDateEnd = (e) => {
        this.state.end = e;
        if(!this.isError()) {
            this.setState({
                end: e,
                rooms: this.getRooms(),
            });

        }
    };

    getRooms() {
        let {start, end} = this.state;
        if(start && end) {
            let rooms = DataManager.sharedInstance().getAvailableRooms(start, end, this.reserve);
            let room = rooms.filter(r => r.id === this.state.room_number);
            if(room.length === 0) {
                this.setState({room_number: null});
            }
            return rooms;
        }
    }

    isError = () => {
        const {start, end} = this.state;
        if(start && end && start.getTime() > end.getTime()) {
            alert("End date can't be smaller than start date. Select correct dates to continue.");
            return true;
        }
    };

    onCancelClick = () => {
        this.props.history.replace(RouterPath.List);
    };

    onReservationClick = () => {
        let data = {
            end: this.state.end,
            start: this.state.start,
            room_number: this.state.room_number,
        };
        if(this.reserve) {
            data.id = this.reserve.id;
        }
        DataManager.sharedInstance().updateReservation(data, (err, res) => {
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
