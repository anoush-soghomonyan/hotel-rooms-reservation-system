export const EDIT_RESERVATION = "EDIT_RESERVATION";

export default function createAction(action, data) {
    return {
        type: action,
        payload: data,
    }
}