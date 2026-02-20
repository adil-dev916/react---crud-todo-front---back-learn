const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    txt: { type: String },
    isCom: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Todo", TodoSchema);