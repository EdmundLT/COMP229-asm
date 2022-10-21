//Import Database Schema
const contactDb = require("../database/contact.mongo");
const DEFAULT_BCONTACT_ID = 1;

//Find the latest Business Contact Id
async function getLatestBConactId() {
  const latestContact = await contactDb.findOne().sort("-id");
  if (!latestContact) {
    return DEFAULT_BCONTACT_ID;
  }

  return latestContact.id;
}

//HTTP GET All Business Contact
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
    token,
    docs: contactDocs,
    username: token.username,
    caution: "",
  });
}
//HTTP POST Create Business Contact
async function httpPostBusinessContact(req, res, next) {
  const { name, number, email } = req.body;
  const id = (await getLatestBConactId()) + 1;
  const addingContact = { id, name, number, email };
  const findingResult = await contactDb.findOne({ email });
  console.log({ findingResult });
  if (findingResult != null) {
    res.redirect("/bcontact/home");
  } else {
    await contactDb.create(addingContact);
    console.log(`Contact ${name} added to the database.`);
    res.redirect("/bcontact/home");
  }
}
async function httpDeleteBusnessContact(req, res, next) {
  const id = req.params.id;
  await contactDb.findOneAndDelete({ id });
  console.log(`Contact #${id} Deleted`);
  res.redirect("/bcontact/home");
}
//Direct to Update Page
async function httpUpdatePage(req, res, next) {
  const id = req.params.id;
  const token = req.cookies.token;
  const updateDoc = await contactDb.findOne({ id });
  res.render("pages/update.ejs", {
    token,
    docs: updateDoc,
    caution: "",
  });
}

//Editing the Contact
async function httpEditBusinessContact(req, res, next) {
  const { name, number, email } = req.body;
  const user = await contactDb.findOne({ email });
  await user.updateOne({ name, number, email });
  res.redirect("/bcontact/home");
}
module.exports = {
  httpGetBusinessCotnact,
  httpPostBusinessContact,
  httpDeleteBusnessContact,
  httpUpdatePage,
  httpEditBusinessContact,
};
