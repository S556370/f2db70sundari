const mongoose = require("mongoose")
const UniversitiesSchema = mongoose.Schema({
    University_Id:Number,
    University_Name: {type: String,required: [true, 'Name of the university cannot be empty']},
    Capacity: Number,
    Location: {type: String,required: [true, 'location of the university cannot be empty']},
    State: String,
    Country: String
})
//The first argument to the model function is going to be the name of the collection of documents that will be stored in your MongoDB.
module.exports = mongoose.model("universities",
    UniversitiesSchema)