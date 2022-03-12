"use strict";

const UserStorage = require("./UserStorage");

class User {

    constructor(body) {
        this.body = body;

    }

    login() {
        const client = this.body;
        const {email, password} = UserStorage.getUserInfo(client.email);
        
        if (email) {
            if (email === client.email && password === client.password) {
                return {success: true};
            }
            return {success: false, msg: "비밀번호가 틀렸습니다."}
        }
        return {success: false, msg: "존재하지 않는 아이디입니다."}
    }

    register() {
        const client = this.body;
        const response = UserStorage.save(client);
        return response;
    }
}

module.exports = User;