import uuidv1 from 'uuid/v1';
import {roomsData} from "./data";
import StorageFactory from "./StorageFactory";

/**
 * this is a fake token
 * @type {string}
 */
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFub3VzaCIsIm5hbWUiOiJBbm91c2ggU29naG9tb255YW4iLCJwYXNzd29yZCI6ImFub3VzaC5wYXNzIn0.2LNw76sf1id94QZ8qJAGMvxx3rjx5TYIN57paLSha2Q";

const errNotExist = "User doesn't exist";
const errAddReserve = "You can't add new reservation";
const errUsernameExist = "This username already has taken :(";
const errSomethingWrong = "Something went wrong, while fetching reservations";
const errLoginPass = "Please make sure that you have entered your login and password correctly.";

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

export function getReservations(data, createdAt, callback) {
    if(reliableUser(data.id, data.token)) {
        let reservations = StorageFactory.getReservations();
        if(reservations) {
            if(callback) {
                callback(null, {data: reservations});
            }
        } else {
            if(callback) {
                callback({message: errSomethingWrong});
            }
        }
    } else {
        callback({message: errNotExist});
    }
}

export function updateReservation(data, callback) {
    if(reliableUser(data.user_id, data.token)) {
        if(!data.id) {
            data.id = uuidv1();
            data.created_at = new Date();
        } else {
            if(!data.updated_at) {
                data.updated_at = [];
            }
            data.updated_at.unshift(new Date());
        }
        const {user_id, token, ...data} = data;
        data.creator_id = user_id;
        try {
            StorageFactory.updateReservation(data);
            callback(null, data);
        } catch(e) {
            callback({message: e});
        }
    } else {
        callback({message: errAddReserve})
    }
}

export function registration(data, callback) {
    let users = StorageFactory.getUsers(),
        fUsers = Object.values(users).filter(user => user.username === data.username);
    if(fUsers.length > 0) {
        callback({message: errUsernameExist})
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
        StorageFactory.setLoggedInUser(data);
        StorageFactory.setRooms(roomsData);
        callback(null, {
            user: data,
            token: createToken(data),
            rooms: Object.values(StorageFactory.getRooms()),
            reservations: Object.values(StorageFactory.getReservations()),
        });
    } else {
        callback({message: errLoginPass});
    }
}
