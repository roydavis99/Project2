$(document).ready(function () {

  console.log($("#map").attr("data-route"));
  /*  var route = $("#map").data-route;
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    let waypoints = [];
  
    route.shows.forEach(show => {
      waypoints.push({
        location: { lat: show.lat, lng: show.lng }
      })
    })
  
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8
    });
    directionsDisplay.setMap(map);
    directionsService.route({
      origin: { lat: route.origin.lat, lng: route.origin.lng },
      destination: { lat: route.destination.lat, lng: route.destination.lng },
      waypoints: waypoints,
      travelMode: 'DRIVING'
    }, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      }
    }); */
});
