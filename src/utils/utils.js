import moment from "moment";

export const checkUsername = (username) => {
    let usernameCheck = /\D+\D*?\w+$/gi;
    return usernameCheck.test(username);
};

export const getDaysCount = (start, end) => {
    let mStart = moment(start),
        mEnd = moment(end);
    return mEnd.diff(mStart, 'days');
};

export const datesArrBetweenDates = (start, end) => {
    let count = getDaysCount(start, end),
        arr = [];

    arr.push(start);
    for(let i = 1; i < count; i++) {
        arr.push(new Date(start.getTime() + (24000*3600*i)));
    }
    return arr;
};

export const dateLL = (date) => {
    return moment(date).format('LL');
};
