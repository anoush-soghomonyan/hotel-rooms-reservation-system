import Request from "./Request";
import {API_GET_RESERVATIONS} from "./RequestConstants";
import Reserve from "../models/Reserve";

export default class GetReservesRequest extends Request {
    constructor(userId) {
        super(API_GET_RESERVATIONS, {id: userId});
    }

    onResponseReady(response) {
        let arr = [];
        for(let reserve of response.data) {
            arr.push(new Reserve(reserve));
        }
        return arr;
    }
}