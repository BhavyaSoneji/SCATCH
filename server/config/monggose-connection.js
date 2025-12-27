const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");

const config = require("config");

mongoose
  .connect(`${config.get("MONGODB_URL")}/Scatch-DB`)
  .then(() => {
    dbgr("Databse Connected Successfully!!..");
  })
  .catch((err) => {
    dbgr(err);
  });

module.exports = mongoose.connection;
