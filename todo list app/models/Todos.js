const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    label: String,
    state: Boolean
});

const Todo = mongoose.model('todo', todoSchema); // Use uppercase for model name

module.exports = Todo; // Use module.exports to export the model
