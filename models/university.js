const mongoose = require("mongoose")
const UniversitiesSchema = mongoose.Schema({
    University_Name: String,
    Capacity: Number,
    Location: String,
    State: String,
    Country: String
})
//The first argument to the model function is going to be the name of the collection of documents that will be stored in your MongoDB.
module.exports = mongoose.model("universities",
    UniversitiesSchema)