import _ from 'underscore';
import Room from "../models/Room";
import Reserve from "../models/Reserve";
import CacheManager from "./CacheManager";
import LoginRequest from "../requests/LoginRequest";
import StorageFactory from "../../backend/StorageFactory";
import RegisterRequest from "../requests/RegisterRequest";
import AddReserveRequest from "../requests/AddReserveRequest";
import GetReservesRequest from "../requests/GetReservesRequest";

let sharedInstance = null;

export default class DataManager {
    static sharedInstanc() {
        if(sharedInstance === null) {
            sharedInstance = new DataManager();
        }
    }

    constructor() {
        this.user = null;
        this.rooms = [];
        this.reservations = [];
        this.roomsCache = new CacheManager(Room);
        this.reservesCache = new CacheManager(Reserve);
    }

    initialSetup(data) {
        this.user = data.user;
        this.rooms = data.rooms;
        this.reservations = data.reservations;
    }

    registration(data, callback) {
        let req = new RegisterRequest(data);
        req.execute()
            .then(res => {
                callback(null, res);
            })
            .catch(err => {
                callback(err);
            })
    }

    login(data, callback) {
        let req = new LoginRequest(data);
        req.execute()
            .then(res => {
                this.initialSetup(res);
                callback(null, res);
            })
            .catch(err => {
                callback(err);
            })
    }

    autoLogin(callback) {
        let user = StorageFactory.getLoggedInUser();
        if(_.isEmpty(user)) {
            callback({message: 'user was logged out'});
        } else {
            this.login(user, (err, res) => {
                if(err) {
                    callback(err);
                } else {
                    callback(null, res);
                }
            })
        }
    }

    /**
     * Function can be used for paging of reservations, it should fetch starts from createdAt timestamp
     * @param userId is active user id
     * @param createdAt is the timestamp
     * @param callback
     */
    getReservations(userId, createdAt, callback) {
        let req = new GetReservesRequest(userId);
        req.execute()
            .then(res => {
                this.reservations = res;
                callback(null, this.reservations);
            })
            .then(err => {
                callback(err);
            })
    }

    /**
     *
     * @param data js object is contain: id (edit mode), room_number, start_date, end_date, adult, children parameters
     * @param edit parameter used when existing reserve need to be edited
     * @param callback
     */
    updateReservation(data, edit, callback) {
        data.user_id = this.user.id;
        let req = new AddReserveRequest(data);
        req.execute()
            .then(res => {
                if(!edit) {
                    this.reservations.unshift(res);
                }
                callback(null, res);
            })
            .catch(err => callback(err));
    }
}