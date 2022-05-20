"use strict"

const User = require("../../model/User");

const output ={
    hello: (req, res) => {
        if (req.data) {res.render("home/indexon",req.data)}
        else {res.render("home/index");} 
        console.log(req.data);
    },
    login: (req, res) => {
        res.render("home/login");
    },
    
    register: (req, res) => {
        res.render("home/register");
    },
    registerSuccess: (req, res) => {
        res.render("home/registerSuccess");
    },
    test: (req, res) => {
        res.send("test");
    }
};

const process ={
    login: async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();
        const url = {
            method: "POST",
            path: "/login",
            status: response.success ? 200 : 400
        };
        if(response.success == true) {
            res.cookie('accessToken', response.accessToken, {overwrite: true});
            if (response.keepchk) { res.cookie('refreshToken', response.refreshToken, {overwrite: true, maxAge: 1.21e+9} );}
            else { res.cookie('refreshToken', response.refreshToken, {overwrite: true});} 
        }
        return res.json(response);
    },
    logout: async (req, res) => {  res.cookie('refreshToken', "", {maxAge:0}); res.redirect('/'); },
    register: async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();
        const url = {
            method: "POST",
            path: "/login",
            status: response.err ? 409 : 201
        };
        return res.status(url.status).json(response);
    },

};

module.exports = {
    output,
    process,
};


