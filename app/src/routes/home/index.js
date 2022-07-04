"use strict";

const express = require("express");
const router = express.Router();
const ctrl = require("./home.ctrl");
const tokencheck = require("../../middleware/toekncheck");

router.get('/authorize', ctrl.proc.kakaologin);
router.get('/redirect', ctrl.proc.kakaoredir);
//router.get('/profile', ctrl.proc.kakaoprofile);

router.get("/",tokencheck.checkTokens("",0), ctrl.output.hello);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);
router.get("/registerSuccess", ctrl.output.registerSuccess);
router.get("/test", tokencheck.checkTokens("/login",1), ctrl.output.test);


router.get("/logout", ctrl.proc.logout);
router.post("/login", ctrl.proc.login);
router.post("/register", ctrl.proc.register)


module.exports = router;