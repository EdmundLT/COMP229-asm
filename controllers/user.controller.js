const userDb = require("../database/user.mongo");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const getUserByEmail = async (email) => {
  const user = await userDb.findOne({ email });
  return user;
};
const getUserById = async (id) => {
  const user = await userDb.findOne({ uid: id });
  return user;
};

function httpGetHomePage(req, res) {
  res.render("index.ejs", { name: req.user.name });
}

async function httpPostRegister(req, res) {
  if (req.body.password !== req.body.confirm_password) {
    res.render("pages/register", {
      caution: "password and confirm password are not same",
    });
  }
  try {
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      uid: uuid.v1(),
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    };
    console.log(user);
    await userDb.create(user);
    console.log(user, "--------Registered and added to Database!----------");
    req.login(user, (err) => {
      if (err) {
        console.log(err);
      }
      res.redirect("/bcontact/home");
    });
  } catch {
    res.redirect("/user/register");
  }
}

function httpLogout(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/user/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}
module.exports = {
  getUserByEmail,
  getUserById,
  httpGetHomePage,
  httpPostRegister,
  httpLogout,
  checkAuthenticated,
  checkNotAuthenticated,
};
