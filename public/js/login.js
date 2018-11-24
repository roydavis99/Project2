//sessionStorage.setItem("name", username);
function processSignUp(e) {
  if (e.preventDefault) { e.preventDefault(); }

  $.ajax({
    method: "POST",
    url: "api/user/",
    data: {
      userName: e.target[0].value,
      password: e.target[1].value,
      displayName: e.target[0].value,
      email: e.target[2].value
    }
  }).then(function(user){
    sessionStorage.clear();
    sessionStorage.setItem("sessionId", user.id);

    //redirect to main form
    window.location.replace("/");
  }).catch(function(){
    //should display to user login does not exist
    console.log("Bad Log in");
  });

  return false;
}
var frmSignUp = document.getElementById("frm-signUp");
if (frmSignUp.attachEvent) {
  frmSignUp.attachEvent("submit", processSignUp);
} else {
  frmSignUp.addEventListener("submit", processSignUp);
}

function processLogin(e) {
  if (e.preventDefault) { e.preventDefault(); }
  console.log(e.target[0].value);
  console.log(e.target[1].value);
  /* do what you want with the form */
  

  $.ajax({
    method: "GET",
    url: "api/user/" + e.target[0].value + "|" + e.target[1].value,
  }).then(function(user){
    console.log(user);
    sessionStorage.clear();
    sessionStorage.setItem("sessionId", user.id);

    //redirect to main form
    window.location.replace("/");
  });

  // You must return false to prevent the default form behavior
  return false;
}

var frmLogin = document.getElementById("frm-login");

if (frmLogin.attachEvent) {
  frmLogin.attachEvent("submit", processLogin);
} else {
  frmLogin.addEventListener("submit", processLogin);
}