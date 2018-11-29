function CreateLike(userId, bandId) {
  try {
    $.ajax({
      method: "POST",
      url: "api/userband/",
      data: {
        UserId: userId,
        BandId: bandId
      }
    }).then(function (data) {
      console.log(data);
      
    });
  } catch (error) {
    console.log(error);
  }
}

function UpdateRate(userId, bandId, rate){
  try {
    $.ajax({
      method: "GET",
      url: "api/userband/ids/" + userId + "|" + bandId
    }).then(function (data) {
      console.log(data);
      if(data !== null){
        console.log("put: " + rate);
        $.ajax({
          method: "PUT",
          url: "api/userband/",
          data: {
            UserId: userId,
            BandId: bandId,
            rating: rate
          }
        }).then(function (data) {
          console.log(data);
        });
      }else{
        $.ajax({
          method: "POST",
          url: "api/userband/",
          data: {
            UserId: userId,
            BandId: bandId,
            rating: rate
          }
        }).then(function (data) {
          console.log(data);
          
        });
      }
    });
    
  } catch (error) {
    console.log(error);
  }
}

//function CreateBand

$(document).on("click", ".db-rating", function () {
  //get userid
  var userid = sessionStorage.getItem("sessionId");
  var rate = $(this).attr("data-rating");
  var bandName = $(this).attr("data-name");
  var bandImage = $(this).attr("data-image");
  var bandPage = $(this).attr("data-page");

  if (userid === null) {
    //load login form
    window.location.replace("/login");
    return;
  }
  try {
    $.ajax({
      method: "GET",
      url: "api/band/byname/" + bandName
    }).then(function (band) {
      console.log(band);
      //band exists
      if (band === null) {
        $.ajax({
          method: "POST",
          url: "api/band/",
          data: {
            name: bandName,
            image: bandImage,
            link: bandPage
          }
        }).then(function (band) {
          //call for save on like
          console.log(band);
          //band exists
          UpdateRate(userid, band.id, rate);
        });
      } else {
        UpdateRate(userid, band.id, rate);
      }

    });
  } catch (error) {
    console.log(error);
  }
});

$(document).on("click", "#btn-like", function () {
  //get userid
  var userid = sessionStorage.getItem("sessionId");

  if (userid === null) {
    //load login form
    window.location.replace("/login");
    return;
  }

  //var bandId = $(this).attr("data-id");
  var bandName = $(this).attr("data-name");
  var bandImage = $(this).attr("data-image");
  var bandPage = $(this).attr("data-page");
  try {
    $.ajax({
      method: "GET",
      url: "api/band/byname/" + bandName
    }).then(function (band) {
      console.log(band);
      //band exists
      if (band === null) {
        $.ajax({
          method: "POST",
          url: "api/band/",
          data: {
            name: bandName,
            image: bandImage,
            link: bandPage
          }
        }).then(function (band) {
          //call for save on like
          console.log(band);
          //band exists
          CreateLike(userid, band.id);
        });
      } else {
        CreateLike(userid, band.id);
      }

    });
  } catch (error) {
    console.log(error);
  }

});