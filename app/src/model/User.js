"use strict";

const UserStorage = require("./UserStorage");

class User {

    constructor(body) {
        this.body = body;

    }

    async login() {
        const client = this.body;
        try {
            const user = await UserStorage.getUserInfo(client.email);
            
            if (user.email) {
                if (user.email === client.email && user.password === client.password) {
                    return {success: true};
                }
                return {success: false, msg: "비밀번호가 틀렸습니다."}
            }
            return {success: false, msg: "존재하지 않는 아이디입니다."}
        } catch (err) {
            console.log(err);
            return { success: false, msg: "존재하지 않는 아이디입니다."};
        }
    }

    async register() {
        const client = this.body;
        try { 
            const response = await UserStorage.save(client);
            return response;
        } catch(err) {
            return {success: false, msg: err};
        }
    }
}

module.exports = User;