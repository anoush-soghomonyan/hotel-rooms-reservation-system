import uuidv1 from 'uuid/v1';
import {roomsData} from "./data";
import StorageFactory from "./StorageFactory";

/**
 * this is a fake token
 * @type {string}
 */
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFub3VzaCIsIm5hbWUiOiJBbm91c2ggU29naG9tb255YW4iLCJwYXNzd29yZCI6ImFub3VzaC5wYXNzIn0.2LNw76sf1id94QZ8qJAGMvxx3rjx5TYIN57paLSha2Q";

const errNotExist = "User doesn't exist";
const invalidParameters = "Invalid parameters";
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
                callback(errSomethingWrong);
            }
        }
    } else {
        callback(errNotExist);
    }
}

export function updateReservation(data, callback) {
    data = Object.assign({}, data);
    if(reliableUser(data.user_id, data.token)) {
        if(!data.start || !data.end || !data.room_number) {
            callback(invalidParameters);
            return;
        }
        if(data.id) {
            if(!data.updated_at) {
                data.updated_at = [];
            }
            data.updated_at.unshift(new Date());
        } else {
            data.id = uuidv1();
            data.created_at = new Date();
        }
        data.creator_id = data.user_id;
        delete data.token;
        delete data.user_id;
        try {
            StorageFactory.updateReservation(data);
            callback(null, data);
        } catch(e) {
            callback(e);
        }
    } else {
        callback(errAddReserve)
    }
}

export function registration(data, callback) {
    data = Object.assign({}, data);
    let users = StorageFactory.getUsers(),
        fUsers = Object.values(users).filter(user => user.username === data.username);
    if(fUsers.length > 0) {
        callback(errUsernameExist)
    } else {
        delete data.token;
        data.id = uuidv1();
        StorageFactory.addUser(data);
        callback(null, data);
    }
}

export function login(data, callback) {
    data = Object.assign({}, data);
    let users = StorageFactory.getUsers(),
        fUsers = Object.values(users).filter(user =>
            user.username === data.username && user.password === data.password
        );
    if(fUsers.length > 0) {
        data.id = fUsers[0].id;
        StorageFactory.setLoggedInUser(data);
        StorageFactory.setRooms(roomsData);
        let result = {
            user: data,
            token: createToken(data),
            rooms: Object.values(StorageFactory.getRooms()),
            reservations: Object.values(StorageFactory.getReservations()),
        };
        callback(null, result);
    } else {
        callback(errLoginPass);
    }
}
