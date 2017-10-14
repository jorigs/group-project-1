function sideOpen() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}
 
function sideClose() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}

$("#continue").on("click", function (){
	$("#locationBox").addClass('animated bounceOutDown')
    $("#firstOverlay").slideUp(1500);
    
})

$("#homeButton").on("click", function(){
    $("#home").show();
    $("#howTo").hide();
    $("#contact").hide();
});

$("#howToButton").on("click", function(){
    $("#home").hide();
    $("#howTo").show();
    $("#contact").hide();
});

$("#contactButton").on("click", function(){
    $("#home").hide();
    $("#howTo").hide();
    $("#contact").show();
});

$("#howTo").hide();
$("#contact").hide();
$("#continue").prop("disabled", true);

$("#inputField").on("keyup", function() {
  $("#continue").prop("disabled", false);
  if( $("#inputField").val() == '') {
    $("#continue").prop("disabled", true);
 }
});

// Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
var address;
var map;

 var request = {
    location: address,
    radius: '500',
    types: ['store']
  };

function initMap() {
        map = new google.maps.Map(document.getElementById('googlemaps'), {
          zoom: 10,
          center: {lat: -34.397, lng: 150.644}
        });
        var geocoder = new google.maps.Geocoder();

        document.getElementById('continue').addEventListener('click', function() {
          geocodeAddress(geocoder, map);
        });
      }

      function geocodeAddress(geocoder, resultsMap) {
        address = document.getElementById('inputField').value;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }





    // Specify location, radius and place types for your Places API search.


  // Create the PlaceService and send the request.
  // Handle the callback with an anonymous function.
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, function(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        // If the request succeeds, draw the place location on
        // the map as a marker, and register an event to handle a
        // click on the marker.
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
      }
    }
  });

// Run the initialize function when the window has finished loading.
google.maps.event.addDomListener(window, 'load', initialize);



  /*    
      var map, infoWindow;
      
      function initMap() {
        map = new google.maps.Map(document.getElementById('googlemaps'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 6
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
            $("#continue").on("click", function(){
                var zipCode = $("#inputField").val();
                var pos = {
                    lat: zipCode.coords.latitude,
                    lng: zipCode.coords.longitude
                }
            })
          // Browser doesn't support Geolocation
          
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      };
*/
