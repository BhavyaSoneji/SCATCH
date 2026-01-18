const userModel = require("../models/user-model");
const ownerModel = require("../models/owner-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

const { OAuth2Client } = require("google-auth-library");

const cilent = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, resp) => {
  try {
    const { token } = req.body;

    const ticket = await cilent.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { email, name, picture, sub } = payload;

    let user = await userModel.findOne({ email });

    if (!user) {
      user = await userModel.create({
        fullName: name,
        email,
        googleId: sub,
        profilePic: picture,
        authProvider: "google",
        contact: null,
        address: "",
      });
    }

    const appToken = generateToken(user, "user");

    resp.cookie("token", appToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    resp.status(201).send({
      success: true,
      user,
    });
  } catch (err) {
    console.error(err);
    resp.status(500).send({
      status: false,
      message: "Google authentication failed",
    });
  }
};

const registerUser = async (req, resp) => {
  try {
    const { email, fullName, password, contact } = req.body;
    const registeredUser = await userModel.find({ email });
    if (registeredUser.length > 0) {
      resp.status(500).send({ status: false, message: "user already exist.." });
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) resp.send({ status: false, message: err.message });
          const createdUser = await userModel.create({
            fullName,
            email,
            password: hash,
            contact,
          });
          const token = generateToken(createdUser, "user");
          resp.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
          });

          resp.status(201).send({
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
    if (!user) {
      const owner = await ownerModel.findOne({ email });
      if (!owner) {
        resp
          .status(401)
          .send({ status: false, message: "Email or Password is incorrect.." });
      } else {
        bcrypt.compare(password, owner.password, async (err, result) => {
          if (result) {
            const token = generateToken(owner, "owner");
            await resp.cookie("token", token, {
              httpOnly: true,
              secure: false,
              sameSite: "lax",
            });
            resp
              .status(201)
              .send({ status: true, message: "Login Successfully done.." });
          } else {
            resp.status(401).send({
              status: false,
              message: "Email or Password is incorrect..",
            });
          }
        });
      }
    } else {
      bcrypt.compare(password, user.password, async (err, result) => {
        if (result) {
          const token = generateToken(user, "user");
          await resp.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
          });
          resp
            .status(201)
            .send({ status: true, message: "Login Successfully done.." });
        } else {
          resp.status(500).send({
            status: false,
            message: "Email or Password is incorrect..",
          });
        }
      });
    }
  } catch (err) {
    resp.status(500).send({ status: false, error: err.message });
  }
};

const logoutUser = async (req, resp) => {
  resp.cookie("token", "");
  resp.status(201).send({ status: true, message: "Logout Successfully Done." });
};

const verifyUser = async (req, resp) => {
  resp.status(201).send({
    status: true,
    user: req.user,
    userType: req.userType,
  });
};

const addToCart = async (req, resp) => {
  try {
    const user = await userModel.findOne({ _id: req.id });

    if (!user) {
      return resp.status(404).send({
        status: false,
        message: "User not found",
      });
    }

    // Check if product already exists in cart
    const existingItem = user.cart.find((item) => {
      return item.product.toString() == req.params.id;
    });

    if (existingItem) {
      // Increment quantity if already exists
      existingItem.qty += 1;
    } else {
      // Add new item to cart
      user.cart.push({
        product: req.params.id,
        qty: 1,
      });
    }

    await user.save();

    resp.status(201).send({
      status: true,
      message: "Product added to cart successfully",
      cart: user.cart,
    });
  } catch (err) {
    console.error(err);
    resp.status(500).send({
      status: false,
      message: err.message,
    });
  }
};

const fetchUserWithCart = async (req, resp) => {
  try {
  const user = await userModel
    .findOne({ _id: req.id })
    .populate("cart.product")
    .lean();

  if (!user) {
    return resp.status(404).send({
      status: false,
      message: "User not found",
    });
  }

  user.profilePic = `data:image/png;base64,${user.profilePic.toString("base64")}`;

  const cartWithImages = user.cart.map((item) => ({
    product:{...item.product,
      frontImage:item.product.frontImage
      ?`data:image/png;base64,${item.product.frontImage.toString('base64')}`
      :null
    },
    qty:item.qty
  }));

  const { cart, ...userWithoutCart } = user;

  resp.status(201).send({
    status: true,
    Message: "User With Cart Fetched Successfully",
    user: userWithoutCart,
    cart: cartWithImages,
  });
  } catch (err) {
    resp
      .status(500)
      .send({ status: false, message: "Error fetching the User With Cart" });
  }
};

const removeFromCart = async (req, resp) => {
  const user = await userModel.updateOne(
    { _id: req.id },
    {
      $pull: {
        cart: { product: req.params.id },
      },
    },
  );

  if (user.modifiedCount === 0) {
    return resp.status(404).send({
      status: false,
      message: "Product not found in cart",
    });
  }

  resp.status(201).send({
    status: true,
    message: "Product Deleted Successfully..",
  });
};

const updateUser = async (req, resp) => {
  const updatedDetails = req.body;
  try {
    if (req.file) {
      updatedDetails.profilePic = req.file.buffer;
    }
    console.log(updatedDetails);
    const newUser = await userModel.findOneAndUpdate(
      { _id: updatedDetails._id },
      updatedDetails,
      {
        new: true,
        runValidator: true,
      },
    );
    if (!newUser) {
      resp
        .status(500)
        .send({ status: false, message: "Error Updating User.." });
    } else {
      // console.log(newUser);
      resp.status(200).send({
        status: true,
        message: "User Updated..",
        updatedUser: newUser,
      });
    }
  } catch (err) {
    resp.status(500).send({ status: false, message: "Error Updating User.." });
  }
};

const updatePassword = async (req, resp) => {
  const { passwordForm, newPassword } = req.body;
  const user = await userModel.findOne({ _id: req.params.id });
  if (newPassword) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        resp
          .status(500)
          .send({ status: false, message: "error updating  password.." });
      } else {
        bcrypt.hash(passwordForm.confirmPassword, salt, async (err, hash) => {
          if (err) {
            resp
              .status(500)
              .send({ status: false, message: "error updating  password.." });
          } else {
            user["password"] = hash;
            await user.save();
            const token = generateToken(user, "user");
            resp.cookie("token", token);
            resp
              .status(200)
              .send({ status: true, message: "New Password Created.." });
          }
        });
      }
    });
  } else {
    bcrypt.compare(
      passwordForm.currentPassword,
      user.password,
      (err, result) => {
        if (err) {
          resp.send({ status: false, message: "error updating  password.." });
        } else {
          if (result) {
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(
                passwordForm.confirmPassword,
                salt,
                async (err, hash) => {
                  if (err) {
                    resp.status(500).send({
                      status: false,
                      message: "error updating  password..",
                    });
                  } else {
                    user.passwrod = hash;
                    await user.save();
                    const token = generateToken(user, "user");
                    resp.cookie("token", token);
                    resp.status(200).send({
                      status: true,
                      message: "Password Updated Successfully..",
                    });
                  }
                },
              );
            });
          } else if (!result) {
            resp
              // .status(500)
              .send({ status: false, message: "Invalid Password.." });
          }
        }
      },
    );
  }
};

module.exports.registerUser = registerUser;
module.exports.loginUser = loginUser;
module.exports.logoutUser = logoutUser;
module.exports.verifyUser = verifyUser;
module.exports.addToCart = addToCart;
module.exports.fetchUserWithCart = fetchUserWithCart;
module.exports.removeFromCart = removeFromCart;
module.exports.googleLogin = googleLogin;
module.exports.updateUser = updateUser;
module.exports.updatePassword = updatePassword;
