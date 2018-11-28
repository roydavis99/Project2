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