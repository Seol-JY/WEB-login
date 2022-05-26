"use strict";
const bcrypt = require('bcryptjs');
const UserStorage = require("./UserStorage");
const Jwt = require("../routes/home/home.jwt"); 

class User {

    constructor(body) {
        this.body = body;

    }

    async login() {
        const client = this.body;
        try {
            const user = await UserStorage.getUserInfo(client.email);
            
            if (user) {
                const auth = bcrypt.compareSync(client.password,user.password);
                if (user.email === client.email && auth) { // password 진위여부 확인
                    const accessToken = Jwt.sign(user);
                    const refreshToken = (client.keepchk==="on")?Jwt.refreshforkeep():Jwt.refresh();
                    const refresh = await UserStorage.setJwtToken(user.email,refreshToken);
                    return {success: refresh, accessToken: accessToken, refreshToken: refreshToken, keepchk: client.keepchk}  
                }
                return {success: false, msg: "비밀번호가 틀렸습니다."}
            }
            return {success: false, msg: "존재하지 않는 아이디입니다."}
        } catch (err) {
            console.log(err);
            return { success: false, msg: "예외 오류 발생!"};
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