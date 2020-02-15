import Request from "./Request";
import {API_REGISTER} from "./RequestConstants";

export default class RegisterRequest extends Request {
    constructor(data) {
        super(API_REGISTER, data);
    }
}