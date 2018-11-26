var sessionId = sessionStorage.getItem("sessionId");

if(sessionId === null){
  window.location.replace("/login");
}