import _ from 'underscore';

const ROOMS = "ROOMS";
const USERS = "USERS";
const RESERVATIONS = "RESERVATIONS";
const LOGGED_IN_USER = "LOGGED_IN_USER";

export default class StorageFactory {

    static clearAllStorageData() {
        window.localStorage.clear();
    }

    static removeItem(keyString) {
        window.localStorage.removeItem(keyString);
    }

    static setString(keyString, valueString) {
        window.localStorage.setItem(keyString, valueString);
    }

    static getString(keyString) {
        return window.localStorage.getItem(keyString);
    }

    static setJSON(keyString, json) {
        if(json) {
            let str = JSON.stringify(json);
            this.setString(keyString, str);
        }
    }

    static getJSON(keyString) {
        let jsonStr = this.getString(keyString);
        let json = {};
        if(jsonStr) {
            json = JSON.parse(jsonStr);
        }
        return json;
    }

    static setLoggedInUser(user) {
        this.setJSON(LOGGED_IN_USER, user);
    }

    static getLoggedInUser() {
        return this.getJSON(LOGGED_IN_USER);
    }

    static logout() {
        this.removeItem(LOGGED_IN_USER);
    }

    static updateReservation(data) {
        let reserves = this.getReservations();
        reserves[data.id] = data;
        this.setJSON(RESERVATIONS, reserves);
    }

    static getReservations() {
        return this.getJSON(RESERVATIONS);
    }

    static addUser(data) {
        let users = this.getUsers();
        users[data.id] = data;
        this.setJSON(USERS, users);
    }

    static getUsers() {
        return this.getJSON(USERS);
    }

    static setRooms(rooms) {
        let roomsData = this.getRooms();
        if(_.isEmpty(roomsData)) {
            let map = {};
            for(let room of rooms) {
                map[room.id] = room;
            }
            this.setJSON(ROOMS, map);
        }
    }

    static getRooms() {
        return this.getJSON(ROOMS)
    }

    static updateRoom(room) {
        let rooms = this.getRooms();
        rooms[room.id] = room;
        this.setJSON(ROOMS, rooms);
    }
}