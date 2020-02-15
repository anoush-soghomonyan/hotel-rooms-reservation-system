import Request from "./Request";
import {API_LOGIN} from "./RequestConstants";

export default class LoginRequest extends Request {
    constructor(data) {
        super(API_LOGIN, data);
    }

    onResponseReady(response) {
        Request.token = response.token;
        return response;
    }
}