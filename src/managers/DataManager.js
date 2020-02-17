import Room from "../models/Room";
import User from "../models/User";
import CacheManager from "./CacheManager";
import Reservation from "../models/Reservation";
import LoginRequest from "../requests/LoginRequest";
import StorageFactory from "../backend/StorageFactory";
import RegisterRequest from "../requests/RegisterRequest";
import GetReservesRequest from "../requests/GetReservesRequest";
import {datesArrBetweenDates, getDaysCount} from "../utils/utils";
import UpdateReserveRequest from "../requests/UpdateReserveRequest";

let sharedInstance = null;

export default class DataManager {
    static sharedInstance() {
        if(sharedInstance === null) {
            sharedInstance = new DataManager();
        }
        return sharedInstance;
    }

    constructor() {
        // StorageFactory.clearAllStorageData()
        this.user = null;
        this.rooms = [];
        this.reservations = [];
        this.roomsCache = new CacheManager(Room);
        this.reservesCache = new CacheManager(Reservation);
    }

    registration(data, callback) {
        let req = new RegisterRequest(data);
        req.execute()
            .then(res => {
                this.login(res, (err, res) => {
                    if(err) {
                        callback(err);
                    } else {
                        callback(null, res);
                    }
                })
            })
            .catch(err => {
                callback(err);
            })
    }

    login(data, callback) {
        let req = new LoginRequest(data);
        req.execute()
            .then(res => {
                console.log('login');
                console.log(res);
                this.user = new User(res.user);
                this.rooms = this.roomsCache.createModelsArray(res.rooms);
                this.reservations = this.reservesCache.createModelsArray(res.reservations, true);
                callback(null, {
                    user: this.user,
                    rooms: this.rooms,
                    reservations: this.reservations,
                });
            })
            .catch(err => {
                callback(err);
            })
    }

    autoLogin(callback) {
        let user = StorageFactory.getLoggedInUser();
        if(!user) {
            callback('user was logged out');
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

    logout() {
        this.user = null;
        StorageFactory.removeLoggedInUser();
    }

    /**
     * Function can be used for paging of reservations, it should fetch starts from createdAt timestamp
     * @param userId is active user id
     * @param createdAt is the timestamp
     * @param callback
     */
    getReservations(userId, createdAt, callback) {
        let req = new GetReservesRequest(userId, createdAt);
        req.execute()
            .then(res => {
                this.reservations = [...this.reservations, this.reservesCache.createModelsArray(res, true)];
                callback(null, this.reservations);
            })
            .then(err => {
                callback(err);
            })
    }

    /**
     *
     * @param data js object is contain: id (edit mode), room_number, start, end, adult, children parameters
     * @param edit parameter used when existing reserve need to be edited
     * @param callback
     */
    updateReservation(data, edit, callback) {
        data.user_id = this.user.id;
        let req = new UpdateReserveRequest(data);
        req.execute()
            .then(res => {
                let obj = this.reservesCache.createModelFromJson(res);
                if(!edit) {
                    this.setupRoomUnavailableDays(res);
                    this.reservations.unshift(obj);
                }
                callback(null, res);
            })
            .catch(err => callback(err));
    }

    setupRoomUnavailableDays(data) {
        let room = this.roomsCache.getModelById(data.room_number),
            days = getDaysCount(data.start, data.end);

        room.unavailable_dates.push(data.start);
        for(let i = 1; i < days; i++) {
            room.unavailable_dates.push(new Date(data.start.getTime() + (24000*3600*i)));
        }
    }

    getAvailableRooms(startDate, endDate) {
        let isBreak = false;
        let rooms = [...this.rooms];
        let dates = datesArrBetweenDates(startDate, endDate);
        for(let room of this.rooms) {
            for(let unDate of room.unavailable_dates) {
                for(let d of dates) {
                    if(getDaysCount(unDate, d) === 0) {
                        rooms.splice(rooms.indexOf(room), 1);
                        isBreak = true;
                        break;
                    }
                }
                if(isBreak) {
                    isBreak = false;
                    break;
                }
            }
        }
    }
}
