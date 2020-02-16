import React from 'react';
import PropTypes from 'prop-types';
import DataManager from "../managers/DataManager";

export default class ReservationsListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: DataManager.sharedInstance().reservations,
        }
    }

    render() {
        let {list} = this.state;
        return <div>
            {list.length > 0
                ? <ul>
                    {list.map(item => <ReservationComponent item={item}/>)}
                </ul>
                : "Not reservations yet"
            }
        </div>
    }
}

function ReservationComponent({item}) {
    return <li>Reservation: #{item.id}</li>
}

ReservationComponent.propTypes = {
    item: PropTypes.object.isRequired,
};