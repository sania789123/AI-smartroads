const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    name: String,
    value: Number,
    location: String,
    status: String
});

const DataModel = mongoose.model("Data", dataSchema);
module.exports = DataModel;
 