

function processSignUp(e) {
  if (e.preventDefault) { e.preventDefault(); }
  console.log("Sign Up");

  /* do what you want with the form */

  // You must return false to prevent the default form behavior
  return false;
}
var form = document.getElementById("frm-signUp");
if (form.attachEvent) {
  form.attachEvent("submit", processSignUp);
} else {
  form.addEventListener("submit", processSignUp);
}

function processLogin(e) {
  if (e.preventDefault) { e.preventDefault(); }
  console.log("login");
  /* do what you want with the form */

  // You must return false to prevent the default form behavior
  return false;
}
var form = document.getElementById("frm-login");
if (form.attachEvent) {
  form.attachEvent("submit", processLogin);
} else {
  form.addEventListener("submit", processLogin);
}