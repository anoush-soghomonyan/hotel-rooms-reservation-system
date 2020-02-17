import {EDIT_RESERVATION} from "../actions";

const editReservation = (state = null, action) => {
    if(action.type === EDIT_RESERVATION) {
        return action.payload;
    }
    return state;
};

export default editReservation;