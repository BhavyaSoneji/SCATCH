const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

const registerUser = async (req, resp) => {
  try {
    // const navigate = useNavigate();
    const { email, fullName, password, contact } = req.body;
    const registeredUser = await userModel.find({ email });
    if (registeredUser.length > 0) {
      resp.status(500).json({ message: "user already exist.." });
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) resp.send(err.message);
          const createdUser = await userModel.create({
            fullName,
            email,
            password: hash,
            contact,
          });
          const token = generateToken(createdUser);
          resp.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
          });

          resp
            .status(201)
            .json({
              status: true,
              message: "user created successfully..",
              createdUser,
            });
        });
      });
    }
  } catch (err) {
    resp.status(500).send(err.message);
  }
};

const loginUser = async (req, resp) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (user == null) {
      resp.status(500).send("Email or Password is incorrect..");
    } else {
      bcrypt.compare(password, user.password, async (err, result) => {
        if (result) {
          const token = generateToken(user);
          await resp.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
          });
          resp
            .status(201)
            .json({ status: true, message: "Login Successfully done.." });
        } else {
          resp
            .status(500)
            .json({
              status: false,
              message: "Email or Password is incorrect..",
            });
        }
      });
    }
  } catch (err) {
    resp.status(500).json({ status: false, error: err.message });
  }
};

const logoutUser = async (req, resp) => {
  resp.cookie("token","");
  resp.status(201).json({ status: true, message: "Logout Successfully Done." });
};

const verifyUser = async (req, resp) => {
  resp.status(201).json({
    status: true,
    user: req.user,
  });
};

const addToCart = async (req, resp) => {
  try{
    const user = await userModel.findOne({ email: req.user });
    user.cart.push(req.params.id);
    await user.save();
    resp.status(201).json({status:true,Messsage:'Product added to cart successfully..'})
  }
  catch(err){
    resp.status(401).json({status:false,Messsage:'Product adding to cart uncessfull, Something bad happend..'})
  }
};

const fetchCart = async(req,resp)=>{
  try{
    const user = await userModel.findOne({_id:req.id}).populate('cart');
    await user.save();
    cartProducts = user.cart;
    resp.status(201).send({status:true,cart:cartProducts});
  }
  catch(err){
    resp.status(401).json({status:false,Messsage:'Error fetching the cart products'});
  }
}

module.exports.registerUser = registerUser;
module.exports.loginUser = loginUser;
module.exports.logoutUser = logoutUser;
module.exports.verifyUser = verifyUser;
module.exports.addToCart = addToCart;
module.exports.fetchCart = fetchCart;
