"use strict";

const output ={
    hello: (req, res) => {
        res.render("home/index");
    },
    login: (req, res) => {
        res.render("home/login");
    },
};

const users = {
    email: ["wlsdud5654", "admin"],
    password: ["123456789", "1234"],
};

const process ={
    login: (req, res) => {
        const email = req.body.email,
          password = req.body.password;
        
        if (users.email.includes(email)) {
            const idx = users.email.indexOf(email);
            if (users.password[idx] === password) {
                return res.json({
                    success: true,
                })
            }
        }
        return res.json({
            success: false,
            msg: "로그인에 실패하였습니다.",
        })
    },
};

module.exports = {
    output,
    process,
};


