"use strict";

const express = require("express");
const router = express.Router();
const ctrl = require("./home.ctrl");
const tokencheck = require("../../middleware/toekncheck");


router.get("/",tokencheck.checkTokens("",0), ctrl.output.hello);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);
router.get("/registerSuccess", ctrl.output.registerSuccess);
router.get("/test", tokencheck.checkTokens("/login",1), ctrl.output.test);
router.get("/logout", ctrl.process.logout);

router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register)


module.exports = router;