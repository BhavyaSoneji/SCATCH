const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  contact: {
    type: Number,
    default:null
  },
  address:{type:String,default:""},
  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      qty: {
        type: Number,
        default: 1,
      },
    },
  ],
  googleId: String,
  AuthProvider: {
    type:String,
    enum:['google','local','both'],
    default: "local",
  },
  profilePic: {
    type: Buffer,
  },
});

module.exports = mongoose.model("users", userSchema);
