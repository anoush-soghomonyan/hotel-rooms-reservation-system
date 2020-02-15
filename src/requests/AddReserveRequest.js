import Request from "./Request";
import {API_ADD_RESERVATION} from "./RequestConstants";
import Reserve from "../models/Reserve";

export default class AddReserveRequest extends Request {
    constructor(data) {
        super(API_ADD_RESERVATION, data);
    }

    onResponseReady(response) {
        return new Reserve(response);
    }
}