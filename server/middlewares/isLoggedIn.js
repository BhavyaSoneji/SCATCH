const jwt = require("jsonwebtoken");

const isLoggedIn = (req, resp, next) => {
  console.log("=== isLoggedIn Middleware ===");
  console.log("All cookies:", req.cookies);
  console.log("Token exists:", !!req.cookies.token);
  
  if (!req.cookies.token) {
    return resp.status(401).json({ status: false, message: "You need to login first" });
  }

  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, buff) => {
    try {
      if (!buff) {
        return resp.status(500).send("User Not Logined");
      }
 
      req.user = buff.email;
      req.id = buff.id;
      next();
    } 
    catch (err) {
      req.flash("error", "somethin went wrong");
      // resp.redirect("/");
    }
  });
};

module.exports.isLoggedIn = isLoggedIn;
