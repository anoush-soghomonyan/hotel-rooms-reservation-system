import Request from "./Request";
import Room from "../models/Room";
import User from "../models/User";
import Reserve from "../models/Reserve";
import {API_LOGIN} from "./RequestConstants";

export default class LoginRequest extends Request {
    constructor(data) {
        super(API_LOGIN, data);
    }

    onResponseReady(response) {
        return {
            user: new User(response.user),
            rooms: createRoomObjects(response.rooms),
            reservations: createReserveObjects(response.reservations),
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

function createReserveObjects(reserves) {
    let arr = [];
    for(let i = reserves.length - 1; i >= 0; i--) {
        arr.push(new Reserve(reserves[i]));
    }
    return arr;
}