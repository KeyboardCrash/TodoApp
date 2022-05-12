"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cors = require('cors');
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
var UserModel = require('./model/user');
var ObjectId = require("mongoose").Types.ObjectId;
mongoose.connect("mongodb://mongodb/todo", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
var app = express();
var port = 3000;
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
var routes = require('./routes/routes');
app.use('/', routes);
// app.listen(port, () => {
//     console.log(`Todo App DEV SERVER started on port ${port}`)
// })
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    app.listen(port, function () {
        console.log("Todo App server started on port ".concat(port));
    });
});
