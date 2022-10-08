//Import Database Schema
const contactDb = require("../database/contact.mongo");
async function httpGetBusinessCotnact(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).redirect("/login");
  }
  const contactDocs = await contactDb.find(
    {},
    {
      __v: 0,
      _id: 0,
    }
  );
  res.render("pages/bcontact.ejs", {
    docs: contactDocs,
    username: token.username,
    caution: "",
  });
}

async function httpPostBusinessContact(req, res, next) {
  const { name, number, email } = req.body;
  const addingContact = { name, number, email };
  const findingResult = await contactDb.findOne({ email });
  console.log({ findingResult });
  if (findingResult != null) {
    res.render("pages/bcontact", { caution: "Contact Email Existed." });
  } else {
    await contactDb.create(addingContact);
    console.log(`Contact ${name} added to the database.`);
    res.redirect("/bcontact");
  }
}

module.exports = {
  httpGetBusinessCotnact,
  httpPostBusinessContact,
};
