"use strict";

const db = require("../config/db");
const bcrypt = require('bcrypt');

class UserStorage {

    static getUserInfo(email) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM users WHERE email = ?;"
            db.query(query, [email], (err, data) => {
                if (err) reject(err);
                resolve(data[0]);
            });
        });
    }

    static async save(userInfo) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO users(email, password, name, sex, date) VALUES(?, ?, ?, ?, ?);"
            const hashedPassword = bcrypt.hashSync(userInfo.password, 10)
            db.query(query, [userInfo.email, hashedPassword, userInfo.name, userInfo.sex, userInfo.date], (err) => {
                if (err) reject(`${err} 중복된 아이디입니다!`);
                resolve({ success: true });
            });
        });
    }

};

module.exports = UserStorage;