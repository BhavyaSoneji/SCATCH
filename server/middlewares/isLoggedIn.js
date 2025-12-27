const jwt = require("jsonwebtoken");

const isLoggedIn = (req, resp, next) => {
  if (!req.cookies.token) {
    req.flash("error", "you need to login first");
    return resp.redirect("/");
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
      resp.redirect("/");
    }
  });
};

module.exports.isLoggedIn = isLoggedIn;
