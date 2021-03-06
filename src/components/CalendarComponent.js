import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Calendar from "react-calendar";
import PopupCloser from "../utils/PopupCloser";
import TextField from "@material-ui/core/TextField";

export default class CalendarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.startMode = false;
        this.state = {
            end_date: props.end,
            start_date: props.start,
            show_calendar: false,
        }
    }

    render() {
        const {show_calendar, start_date, end_date} = this.state;
        return <div>
            <TextField
                color='secondary'
                label="Start date"
                value={this.showDate(start_date)}
                onClick={this.onStartDateClick}
            />
            <TextField
                color='secondary'
                label="End date"
                value={this.showDate(end_date)}
                onClick={this.onEndDateClick}
            />
            {show_calendar &&
            <PopupCloser
                style={{width: "fit-content"}}
                handleClose={() => {this.setState({show_calendar: false})}}
            >
                <Calendar
                    minDate={new Date()}
                    maxDate={moment(moment("30-04-2020", "DD-MM-YYYY")).toDate()}
                    onChange={this.handleCalendarChange} value={new Date()}
                />
            </PopupCloser>
            }
        </div>
    }

    onStartDateClick = () => {
        this.startMode = true;
        this.toggleCalendar();
    };

    onEndDateClick = () => {
        this.startMode = false;
        this.toggleCalendar();
    };

    toggleCalendar = () => {
        this.setState(state => ({show_calendar: !state.show_calendar}));
    };

    showDate(date) {
         return date ? moment(date).format('LL') : "";
    }

    handleCalendarChange = (e) => {
        let state = {show_calendar: false};
        if(this.startMode) {
            state.start_date = e;
            this.props.handleStartDate(e);
        } else {
            state.end_date = e;
            this.props.handleEndDate(e);
        }
        this.setState(state);
    }
}
/**
 *
 * @type {{handleEndDate: function argument is a Date object, handleStartDate: function argument is a Date object}}
 */
CalendarComponent.propTypes = {
    end: PropTypes.string,
    start: PropTypes.string,
    handleEndDate: PropTypes.func.isRequired,
    handleStartDate: PropTypes.func.isRequired,
};