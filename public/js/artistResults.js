$(document).on("click", "@btn-like", function () {
//get userid
  var userid = sessionStorage.getItem("sessionId");

  if(userid === undefined){
    //load login form

    return;
  }

  var bandId = $(this).attr("data-id");
  
  var bandName = $(this).attr("data-name");
  var bandImage = $(this).attr("data-image");
  var bandPage = $(this).attr("data-page");

  if (bandId === "") {
    //create band.
    console.log("new");
    $.ajax({
      method: "POST",
      url: "api/band/",
      data:{
        name: bandName,
        image:bandImage,
        link:bandPage
      }
    }).then(function(band){
      //call for save on like
    }).catch(function(){
  
      console.log("bad log in");
    });
  }

});