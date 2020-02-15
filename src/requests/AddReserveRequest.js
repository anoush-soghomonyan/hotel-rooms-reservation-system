import Request from "./Request";
import {API_ADD_RESERVATION} from "./RequestConstants";

export default class AddReserveRequest extends Request {
    constructor(data) {
        super(API_ADD_RESERVATION, data);
    }
}