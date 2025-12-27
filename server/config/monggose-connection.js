const mongoose = require("mongoose");

mongoose
.connect("mongodb://localhost:27017/Scatch-DB")
.then(()=>{
    console.log("Databse Connected Successfully!!..");
})
.catch((err)=>{
    console.log(err);
})

module.exports = mongoose.connection;