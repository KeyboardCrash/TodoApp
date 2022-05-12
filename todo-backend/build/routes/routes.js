"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
var uuid_1 = require("uuid");
var UserModel = require('../model/user');
var TodoModel = require('../model/todo');
router.use(function (req, res, next) {
    next();
});
router.route('/api').get(function (req, res) {
    res.send('Todo App API v1.0');
});
/**
 * Grab requested todo
 */
router.route('/api/todo/:id').get(function (req, res) {
    if (req.params.id) {
        res.send("req id ".concat(req.params.id));
    }
    else {
        res.send("No Todo with ID ".concat(req.params.id, " was found"));
    }
});
/**
 * Update existing todo
 */
router.route('/api/todo/:id').patch(function (req, res) {
    if (req.params.id) {
        res.send("Modifying todo with id ".concat(req.params.id));
    }
    else {
        res.send("No Todo with ID ".concat(req.params.id, " was found"));
    }
});
/**
 * Create new todo
 */
router.route('/api/todo/new').post(function (req, res) {
    console.log(req.body);
    if (req.body.todo) {
        var uuid = (0, uuid_1.v4)();
        res.json({
            "uuid": uuid,
            "todo": req.body.todo
        });
    }
    else {
        res.json({ 'error': 'Must follow proper format' });
    }
});
router.route('/register').post(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                if (!user || !password) {
                    res.json({
                        message: "Username or password not provided"
                    });
                }
                return [4 /*yield*/, UserModel.findOne({ username: username }).exec()];
            case 1:
                user = _b.sent();
                if (user) {
                    res.status(500).json({
                        message: "User already exists"
                    });
                    return [2 /*return*/];
                }
                res.json({
                    message: "User Registered Successfully"
                });
                return [4 /*yield*/, UserModel.create({ username: username, password: password })];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); });
router.route('/login').post(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                if (!user || !password) {
                    res.json({
                        message: "Username or password not provided"
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, UserModel.findOne({ username: username }).exec()];
            case 1:
                user = _b.sent();
                bcrypt.compare(password, user.password, function (err, hashCheck) {
                    if (err) {
                        throw (err);
                    }
                    if (!user || !hashCheck) {
                        res.status(403).json({
                            message: "Invalid login"
                        });
                        return;
                    }
                    res.json({
                        message: "Successful"
                    });
                });
                return [2 /*return*/];
        }
    });
}); });
module.exports = router;
