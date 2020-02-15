import Reserve from "../models/Reserve";
import LoginRequest from "../requests/LoginRequest";
import StorageFactory from "../../backend/StorageFactory";
import RegisterRequest from "../requests/RegisterRequest";
import GetReservesRequest from "../requests/GetReservesRequest";

let sharedInstance = null;

export default class DataManager {
    static sharedInstanc() {
        if(sharedInstance === null) {
            sharedInstance = new DataManager();
        }
    }

    constructor() {
        this.admin = null;
        this.rooms = [];
        this.reservations = [];
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
                this.user = res.user;
                this.rooms = res.rooms;
                callback(null, res);
            })
            .catch(err => {
                callback(err);
            })
    }

    autoLogin(callback) {
        let user = this.login(StorageFactory.getLoggedInUser());
        if(user.hasOwnProperty('username') && user.hasOwnProperty('password')) {
            this.login(user, (err, res) => {
                if(err) {
                    callback(err);
                } else {
                    callback(null, res);
                }
            })
        } else {
            callback('user was logged out');
        }
    }

    getReservations(userId, callback) {
        let req = new GetReservesRequest(userId);
        req.execute()
            .then(res => {
                let reserves = Object.values(res);
                for(let reserve of reserves) {
                    this.reservations.push(new Reserve(reserve));
                }
                callback(null, this.reservations);
            })
            .then(err => {
                callback(err);
            })
    }

    addReservation(tsStart, tsEnd, adultNum, childrenNum) {
        let data = {
            created_at: new Date(),
            interval: [tsStart, tsEnd],
            adult: adultNum,
            children: childrenNum,
        };
        this.reservations.unshift(new Reserve(data));
    }

    editReservation() {

    }
}