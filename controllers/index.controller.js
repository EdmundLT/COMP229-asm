function home(req, res, next) {
  const token = req.cookies.token;
  res.render("pages/index", { token });
}
function about(req, res, next) {
  const token = req.cookies.token;
  res.render("pages/about", { title: "About Me", token });
}
function contact(req, res, next) {
  const token = req.cookies.token;
  res.render("pages/contact", { token });
}

function projects(req, res, next) {
  const token = req.cookies.token;
  res.render("pages/project", { token });
}
function contactForm(req, res, next) {
  const { name, email, message } = req.body;
  const form = { name, email, message };
  console.log(form);
  res.redirect("/");
}
function services(req, res, next) {
  const token = req.cookies.token;
  res.render("pages/services", { token });
}
module.exports = {
  home,
  about,
  contact,
  contactForm,
  projects,
  services,
};
