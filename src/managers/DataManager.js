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
        sharedInstance = null;
        StorageFactory.removeLoggedInUser();
    }

    clearAllStorageData() {
        StorageFactory.clearAllStorageData();
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
     * @param callback
     */
    updateReservation(data, callback) {
        data.user_id = this.user.id;
        let req = new UpdateReserveRequest(data);
        req.execute()
            .then(res => {
                if(!data.id) {
                    this.setupRoomUnavailableDays(res);
                } else {
                    this.revertRoomUnavailableDays(data);
                    this.setupRoomUnavailableDays(res);
                }
                let obj = this.reservesCache.createModelFromJson(res);
                if(!data.id) {
                    this.reservations.unshift(obj);
                }
                callback(null, res);
            })
            .catch(err => callback(err));
    }

    setupRoomUnavailableDays(data) {
        let room = this.roomsCache.getModelById(data.room_number),
            dateArray = datesArrBetweenDates(data.start, data.end);

        room.unavailable_dates = [...room.unavailable_dates, ...dateArray];
        StorageFactory.updateRoom(room);
    }

    revertRoomUnavailableDays(data) {
        let oldRes = this.reservesCache.getModelById(data.id),
            oldDates = datesArrBetweenDates(oldRes.start, oldRes.end),
            oldRoom = this.roomsCache.getModelById(oldRes.room_number);
        for(let date of oldDates) {
            for(let i = 0; i < oldRoom.unavailable_dates.length; i++) {
                let unavailable = oldRoom.unavailable_dates[i];
                if(getDaysCount(unavailable, date) === 0) {
                    oldRoom.unavailable_dates.splice(i, 1);
                    break;
                }
            }
        }
    }

    getAvailableRooms(startDate, endDate, reservation = null) {
        if(reservation) {
            let room = this.roomsCache.getModelById(reservation.room_number);
            let dates = [...room.unavailable_dates];
            this.revertRoomUnavailableDays(reservation);
            room.tmp_dates = room.unavailable_dates;
            room.unavailable_dates = dates;
        }
        let isBreak = false;
        let rooms = [...this.rooms];
        let dates = datesArrBetweenDates(startDate, endDate);
        for(let room of this.rooms) {
            let unavailable_dates = room.tmp_dates || room.unavailable_dates;
            for(let unDate of unavailable_dates) {
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
        return rooms;
    }
}
