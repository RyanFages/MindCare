const mongoose = require("mongoose");

const EvalSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    concern: { type: [String], default: [] },
    type: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Eval", EvalSchema);
