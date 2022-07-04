"use strict"

const client_id = process.env.CLIENT_ID;
const redir = process.env.REDIR;
const qs = require("qs");
const axios = require('axios');
const User = require("../../model/User");

const output ={
    hello: (req, res) => {
        if (req.data) {res.render("home/indexon",req.data)}
        else {res.render("home/index");} 
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
const call = async (method, uri, param, header) => {
    let rtn;
    try {
        rtn = await axios({
            method: method,
            url: uri,
            headers: header,
            data: param
        })
    } catch (err) {
        rtn = err.response;
    }    
    return rtn.data;
}
const proc ={
    kakaoprofile: async(req, res) =>{
        const uri = "https://kapi.kakao.com/v2/user/me";
        const param = {};
        const header = {
            'content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + req.cookies.accessToken
        }
        const rtn = await call('POST', uri, param, header);
        return ({email: rtn.kakao_account.email, name: rtn.kakao_account.profile.nickname});
    },
    kakaoredir: async (req, res) => {
        const redirect_uri = redir+'/redirect'
        const param = qs.stringify({
            "grant_type": 'authorization_code',
            "client_id": client_id,
            "redirect_uri": redirect_uri,
            "client_secret": '',
            "code": req.query.code
        });
        const header = { 'content-type': 'application/x-www-form-urlencoded' };
        const rtn = await call('POST',  'https://kauth.kakao.com/oauth/token', param, header);
        res.cookie('accessToken', rtn.access_token, {overwrite: true});
        res.cookie('refreshToken', rtn.refresh_token, {overwrite: true});
        res.cookie('tokenType',"1");
        res.status(302).redirect("/");
    },
    kakaologin: (req, res) => {
        let { scope } = req.query;
        let scopeParam = "";
        if (scope) {
            scopeParam = "&scope=" + scope;
        }
        const redirect_uri = redir+'/redirect'
        res.status(302).redirect(`https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code${scopeParam}`);
    },
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
            res.cookie('tokenType', "0");
        }
        return res.json(response);
    },
    logout: async (req, res) => {
        res.cookie('accessToken', "", {maxAge:0});
        res.cookie('refreshToken', "", {maxAge:0});
        res.redirect('/'); 
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
    proc,
};


