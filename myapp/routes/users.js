const mongoose = require("mongoose");
const plm = require("passport-local-mongoose")
mongoose.connect("mongodb://localhost/students")
.then(function(){
  console.log("connected")
}).catch((err =>{
  console.log(err)
}))

// Define the schema for the student registration
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
password:String,
grade:String,
userType: {
  type: String,
  enum: ["admin", "student"],
  default: "student"
},
studentID: {
  type: String,
  required: true
}
});

// Define the schema for the attendance record

UserSchema.plugin(plm);
// Create the models for registration and attendance using the schemas
const model = mongoose.model('User', UserSchema);


module.exports = model;




