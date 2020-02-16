export const checkUsername = (username) => {
    let usernameCheck = /\D+\D*?\w+$/gi;
    return usernameCheck.test(username);
};