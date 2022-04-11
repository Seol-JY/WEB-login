"use strict";

//모듈
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv");
const morgan = require("morgan");

const app = express();
dotenv.config();

//라우팅
const home = require("./src/routes/home");

app.set("views", "./src/views");
app.set("view engine", "ejs");


app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/",home); 


module.exports = app;
