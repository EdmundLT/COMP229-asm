const userDb = require("../database/user.mongo");
//Bcrypt
const bcrypt = require("bcryptjs");
//JWT
const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET_KEY;

function login(req, res, next) {
  const token = req.cookies.token;
  res.render("pages/login", { caution: "", token });
}

async function loginAuth(req, res, next) {
  const { username, password } = req.body;
  const user = await userDb.findOne({ username });
  try {
    if (user != null) {
      const hashed = user.password;
      const compareResult = bcrypt.compareSync(password, hashed);
      console.log(compareResult);
      if (compareResult) {
        const token = jwt.sign({ username }, jwtSecretKey, {
          algorithm: "HS256",
          expiresIn: 3000,
        });
        console.log({ token });
        res.cookie("token", token, { maxAge: 3000 * 1000 });
        res.redirect("/bcontact");
      } else {
        res.render("pages/login", {
          caution: "username or password incorrect, please try again.",
        });
      }
    } else {
      res.render("pages/login", {
        caution: "username or password incorrect, please try again.",
      });
    }
  } catch (error) {}
}


module.exports = { login, loginAuth };
