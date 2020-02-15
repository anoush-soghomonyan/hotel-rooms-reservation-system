import Request from "./Request";
import Room from "../models/Room";
import User from "../models/User";
import {API_LOGIN} from "./RequestConstants";

export default class LoginRequest extends Request {
    constructor(data) {
        super(API_LOGIN, data);
    }

    onResponseReady(response) {
        return {
            user: new User(response.user),
            rooms: createRoomObjects(response.rooms),
        }
    }
}

function createRoomObjects(rooms) {
    let arr = [];
    for(let room of rooms) {
        arr.push(new Room(room));
    }
    return arr;
}