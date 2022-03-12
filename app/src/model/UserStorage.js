"use strict";

class UserStorage {
    static #users = {
        email: ["wlsdud5654", "admin"],
        password: ["123456789", "1234"],
    };

    static getUsers(...fields) {
        const users = this.#users;
        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers;
    };
    static getUserInfo(email) {
        const users = this.#users;
        const idx = users.email.indexOf(email);
        const usersKeys = Object.keys(users);
        const userInfo = usersKeys.reduce((newUser, info) => {
            newUser[info] = users[info][idx];
            return newUser;
        }, {});

        return userInfo;
    }
};

module.exports = UserStorage;