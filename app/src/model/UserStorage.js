"use strict";
const db = require("../config/db");
const bcrypt = require('bcryptjs');

class UserStorage {

    static async getUserInfo(email) {
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

    static async getJwtToken (email) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM tokens WHERE email = ?;"
            db.query(query,[email],(err, data) => {
                if (err) reject (err);
                resolve(data[0]);
            });
        })

    }

    static async getJwtEmail (token) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM tokens WHERE token = ?;"
            db.query(query,[token],(err, data) => {
                if (err) reject (err);
                if(data.length==1) resolve(data[0].email);
                else resolve("");
            });
        })

    }

    static async setJwtToken (email, token) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO tokens(email, token) VALUES(?, ?) ON DUPLICATE KEY UPDATE email= ?, token =?;"
            db.query(query, [email, token, email, token], (err) => {
                if (err) reject(err);
                resolve(true);
            });
        })

    }
};

module.exports = UserStorage;