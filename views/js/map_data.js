var map;
var directionsService;
var directionsDisplay;
var stepDisplay;
var markerArray = [];
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 49.8880, lng: -119.4960},
        zoom: 12
    });

    google.maps.event.addDomListener(window,"resize",function(){
      var center = map.getCenter();
      google.maps.event.trigger(map,"resize");
      map.setCenter(center);
    });

    directionsDisplay = new google.maps.DirectionsRenderer();
    stepDisplay = new google.maps.InfoWindow();
    directionsDisplay.setMap(map);
}

$(document).ready(function(){
    $.ajax({
      type: 'GET',
      url: 'http://159.203.47.53:8080/displayMap',
      dataType: 'json',
      success: function(data){
        buildRoute(data);
    },
      error: function(data){
        console.log('Error, Ajax call unsuccessful.', data);
      }
    });
  });

function buildRoute(data){
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer({
      suppressMarkers: true
    });
    var waypts = [];
    var originPoint = data[0];
    var destinationPoint = data[22];

    // API ONLY ALLOWS FOR 23 ATTRACTIONS AT A TIME
    for(var i = 1; i < 23; i++){
      waypts.push({
        location: (data[i].lat + ", " + data[i].lng)
      });
      }

    directionsDisplay.addListener('directions_changed', function() {
        //computeTotalTravelTime(directionsDisplay.getDirections();
        computeTotalDistance(directionsDisplay.getDirections());
    });
    for (var i = 0; i < 23; i++) {
      var currPos = {lat: data[i].lat, lng: data[i].lng}
      var marker = new google.maps.Marker({
        position: currPos,
        map: map
      });
      attachInfoWindow(marker, data[i].description, data[i].name);
      markerArray[i] = marker;
    }
    displayRoute(originPoint, destinationPoint, waypts, directionsService,
    directionsDisplay, data);
  }

function attachInfoWindow(marker, desc, name) {
  google.maps.event.addListener(marker, 'click', function () {
    stepDisplay.setContent("<h5>" + name + "</h5>" + "<br>" + desc);
    stepDisplay.open(map, marker);
  });
}


function computeTotalDistance(result) {
  var total = 0;
  var myRoute = result.routes[0];
  for(var i = 0; i < myRoute.legs.length; i++) {
    total += myRoute.legs[i].distance.value;
  }
  total = total / 1000;
  document.getElementById('total').innerHTML = 'Distance: ' + total + ' km';

}

// TODO: Find out how to get the actual time ?_?
function computeTotalTravelTime(result) {
  var total = 0;
  var myRoute = result.routes[0];
  for(var i = 0; i < myRoute.legs.length; i++) {
    total += myRoute.legs[i].duration.value;
  }
  total = total / 1000;
  document.getElementById('total').innerHTML = 'Time' + total + 'seconds';
}

function displayRoute(originPoint, destinationPoint, waypts, service, display, data) {
  var dataSize = (originPoint.length + destinationPoint.length + waypts.length);

    service.route({
      origin: originPoint,
      destination: destinationPoint,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: 'DRIVING'
    }, function(res, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(res);
        var route = res.routes[0];
      }
    });
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directionScroll'));
  }
