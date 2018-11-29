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

$(document).on("click", ".db-rating", function () {
  //get userid
  var userId = sessionStorage.getItem("sessionId");
  var bandId = $(this).attr("data-bandid");
  var rate = $(this).attr("data-rating");
  console.log(bandId);
  try {
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
  } catch (error) {
    console.log(error);
  }
});

$(document).on("click", "#btn-like", function () {
  //get userid
  var userid = sessionStorage.getItem("sessionId");

  console.log(userid);
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