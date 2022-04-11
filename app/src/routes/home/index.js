"use strict";

const express = require("express");
const router = express.Router();
const ctrl = require("./home.ctrl");
const tokencheck = require("../../middleware/toekncheck");


router.get("/", ctrl.output.hello);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);
router.get("/registerSuccess", ctrl.output.registerSuccess);
router.get("/test", tokencheck.checkTokens, ctrl.output.test);


router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register)


module.exports = router;