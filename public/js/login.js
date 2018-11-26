

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
  }).catch(function(){

    console.log("bad log in");
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