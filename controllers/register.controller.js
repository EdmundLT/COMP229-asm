const userDb = require("../database/user.mongo");
//Bcrypt
const bcrypt = require("bcryptjs");
function register(req, res, next) {
  const token = req.cookies.token;
  res.render("pages/register", { caution: "", token });
}
async function httpPostRegister(req, res, next) {
  const { username, email, password, confirm_password } = req.body;
  console.log({ username, password, confirm_password });
  if (password != confirm_password) {
    res.render("pages/register", {
      caution: "Confirm password must same as your password",
    });
  } else {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashed = bcrypt.hashSync(password, salt);
      console.log({ hashed });
      const user = await userDb.findOne({ username: username });
      console.log(user);
      if (user != null) {
        res.render("pages/register", {
          caution: "username existed, try login",
        });
      } else {
        const registeredUser = {
          username,
          email,
          password: hashed,
        };
        await userDb.create(registeredUser);
        console.log(`user ${username} added into the database`);
        res.redirect("/");
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
