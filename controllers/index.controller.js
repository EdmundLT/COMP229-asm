function home(req, res, next) {
  res.render("pages/index");
}
function about(req, res, next) {
  res.render("pages/about", { title: "About Me" });
}
function contact(req, res, next) {
  res.render("pages/contact");
}

function projects(req, res, next) {
  res.render("pages/project");
}
function contactForm(req, res, next) {
  const { name, email, message } = req.body;
  const form = { name, email, message };
  console.log(form);
  res.redirect("/");
}
function services(req, res, next) {
  res.render("pages/services");
}
module.exports = {
  home,
  about,
  contact,
  contactForm,
  projects,
  services,
};
