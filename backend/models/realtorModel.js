const mongoose = require("mongoose");

const realtorSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String
})

const Realtor = mongoose.model("Realtor", realtorSchema);

module.exports = Realtor;