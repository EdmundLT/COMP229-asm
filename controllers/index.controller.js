function home(req, res, next) {
  user = req.user ? req.user : null;
  res.render("pages/index", { user });
}
function about(req, res, next) {
  user = req.user ? req.user : null;
  res.render("pages/about", { title: "About Me", user });
}
function contact(req, res, next) {
  user = req.user ? req.user : null;
  res.render("pages/contact", { user });
}

function projects(req, res, next) {
  user = req.user ? req.user : null;
  console.log(user);
  res.render("pages/project", { user });
}
function contactForm(req, res, next) {
  const { name, email, message } = req.body;
  const form = { name, email, message };
  console.log(form);
  res.redirect("/");
}
function services(req, res, next) {
  user = req.user ? req.user : null;
  res.render("pages/services", { user });
}
module.exports = {
  home,
  about,
  contact,
  contactForm,
  projects,
  services,
};
