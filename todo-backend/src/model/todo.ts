const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    userId: mongoose.Schema.ObjectId,
    payload:
        {
            checked: Boolean,
            todo: String,
        }
})

const TodoModel = mongoose.model("Todo", todoSchema);

module.exports = TodoModel;
export {}
