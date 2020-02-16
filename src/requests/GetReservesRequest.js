import Request from "./Request";
import {API_GET_RESERVATIONS} from "./RequestConstants";

export default class GetReservesRequest extends Request {
    constructor(userId, createdAt) {
        super(API_GET_RESERVATIONS, {
            id: userId,
            from: createdAt,
        });
    }

    onResponseReady(response) {
        return response.data;
    }
}