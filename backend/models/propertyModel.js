const mongoose = require("mongoose");

const propertySchema = mongoose.Schema({
    title: String,
    description: String,
    location: String,
    city: String,
    state: String,
    price: Number,
    dimensions: String,
    image:String,
    realtorEmail: String,
    realtorMobile: String
})

const Property = mongoose.model("Properties", propertySchema);

module.exports = Property;