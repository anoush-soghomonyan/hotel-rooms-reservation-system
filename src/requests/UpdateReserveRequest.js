import Request from "./Request";
import {API_UPDATE_RESERVATION} from "./RequestConstants";

export default class UpdateReserveRequest extends Request {
    constructor(data) {
        super(API_UPDATE_RESERVATION, data);
    }
}