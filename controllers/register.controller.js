const userDb = require("../database/user.mongo");
//Bcrypt
const bcrypt = require("bcryptjs");
//JWT
const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET_KEY;

function register(req, res, next) {
  const token = req.cookies.token;
  if (token) {
    res.redirect("/");
    return;
  }
  res.render("pages/register", { caution: "", token });
}
async function httpPostRegister(req, res, next) {
  const { username, email, password, confirm_password } = req.body;
  const token = req.cookies.token;
  if (token) res.redirect("/");
  if (password != confirm_password) {
    res.render("pages/register", {
      caution: "Confirm password must same as your password",
      token,
    });
  } else {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashed = bcrypt.hashSync(password, salt);
      const user = await userDb.findOne({ email });
      if (user != null) {
        res.render("pages/register", {
          caution: "User existed, try using different username.",
          token,
        });
      } else {
        const token = jwt.sign({ username }, jwtSecretKey, {
          algorithm: "HS256",
          expiresIn: 3000,
        });
        const registeredUser = {
          username,
          email,
          password: hashed,
        };
        await userDb.create(registeredUser);
        console.log(`user ${username} added into the database`);
        res.cookie("token", token, { maxAge: 3000 * 1000 });
        res.redirect("/bcontact/home");
      }
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = {
  register,
  httpPostRegister,
};
