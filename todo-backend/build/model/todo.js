"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var todoSchema = new Schema({
    userId: mongoose.Schema.ObjectId,
    todos: [
        {
            checked: Boolean,
            text: String,
            id: String
        }
    ]
});
var TodoModel = mongoose.model("Todos", todoSchema);
module.exports = TodoModel;
