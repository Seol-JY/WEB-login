"use strict"

const User = require("../../model/User");

const output ={
    hello: (req, res) => {
        res.render("home/index");
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
            status: response.err ? 400 : 200
        };
        res.cookie('accessToken', response.accessToken, {overwrite: true}); 
        res.cookie('refreshToken', response.refreshToken, {overwrite: true});
        return res.json(response);
    },
    
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


