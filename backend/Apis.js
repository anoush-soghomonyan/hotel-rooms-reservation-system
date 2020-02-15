import uuidv1 from 'uuid/v1';
import {roomsData} from "./data";
import StorageFactory from "./StorageFactory";

/**
 * this is a fake token
 * @type {string}
 */
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFub3VzaCIsIm5hbWUiOiJBbm91c2ggU29naG9tb255YW4iLCJwYXNzd29yZCI6ImFub3VzaC5wYXNzIn0.2LNw76sf1id94QZ8qJAGMvxx3rjx5TYIN57paLSha2Q";

export function createToken(data) {
    return token;
}

export function reliableUser(id, token) {
    let users = StorageFactory.getUsers(),
        user = users[id],
        {username, password} = StorageFactory.getLoggedInUser();
    if(user && token === createToken(user) && username === user.username && password === user.password) {
        return true;
    }
}

export function getReservations(data, callback) {
    if(reliableUser(data.id, data.token)) {
        let reservations = StorageFactory.getReservations();
        if(reservations) {
            if(callback) {
                callback(null, {data: reservations});
            }
        } else {
            if(callback) {
                callback({message: "Something went wrong, while fetching reservations"})
            }
        }
    } else {
        callback({message: "User doesn't exist"});
    }
}

export function addReservation(data, callback) {

}

export function registration(data, callback) {
    let users = StorageFactory.getUsers(),
        fUsers = Object.values(users).filter(user => user.username === data.username);
    if(fUsers.length > 0) {
        callback({message: "This username already has taken :("})
    } else {
        data.id = uuidv1();
        StorageFactory.addUser(data);
        callback(null, {data: data});
    }
}

export function login(data, callback) {
    let users = StorageFactory.getUsers(),
        fUsers = Object.values(users).filter(user =>
            user.username === data.username && user.password === data.password
        );
    if(fUsers.length > 0) {
        StorageFactory.addUser(data);
        StorageFactory.setLoggedInUser(data);
        data.token = createToken(data);
        StorageFactory.setRooms(roomsData);
        callback(null, {user: data, rooms: StorageFactory.getRooms()});
    } else {
        callback({message: "Please make sure that you have entered your login and password correctly."})
    }
}