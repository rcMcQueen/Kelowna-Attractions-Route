var markers = [];
var map;

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
    stepDisplay = new google.maps.InfoWindow();
  }

function makeMarker(data) {
            var aid = data.aid;
            var currPos = {lat: data.lat, lng: data.lng};
            var marker = new google.maps.Marker({
              position: currPos,
              map: map
            });
            markers[aid] = marker;
            attachInfoWindow(marker, "MISSING DESCRIPTION. If found, please return to Group 16. We miss it.", data.name);
}

function attachInfoWindow(marker, desc, name) {
  google.maps.event.addListener(marker, 'click', function () {
    stepDisplay.setContent("<h5>" + name + "</h5>" + "<br>" + desc);
    stepDisplay.open(map, marker);
  });
}

function removeMarker(aid) {
  markers[aid].setMap(null);
}
