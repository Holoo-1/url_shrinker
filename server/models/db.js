const mongoose = require("mongoose");

const URLSchema = new mongoose.Schema({
    longURL: {
        type: String,
        required: true
    },
    shortID: {
        type: String,
        required: true
    },
    timestamp: {
		type: String,
		default: Date.now()
	}
});

module.exports = mongoose.model("URL", URLSchema);