function sideOpen() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}

function sideClose() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}

$("#continue").on("click", function () {
    $("#locationBox").addClass('animated bounceOutDown')
    $("#firstOverlay").slideUp(1500);

})

$("#homeButton").on("click", function () {
    $("#home").show();
    $("#howTo").hide();
    $("#contact").hide();
});

$("#howToButton").on("click", function () {
    $("#home").hide();
    $("#howTo").show();
    $("#contact").hide();
});

$("#contactButton").on("click", function () {
    $("#home").hide();
    $("#howTo").hide();
    $("#contact").show();
});

$("#howTo").hide();
$("#contact").hide();
$("#continue").prop("disabled", true);

$("#inputField").on("keyup", function () {
    $("#continue").prop("disabled", false);
    if ($("#inputField").val() == '') {
        $("#continue").prop("disabled", true);
    }
});





var geocoder;
var map;
var pyrmont = {
        lat: -33.867,
        lng: 151.195
    };

var request = {
    location: pyrmont,
    radius: '5000',
    types: ['library', 'cafe']
  };



function initialize() {

    map = new google.maps.Map(document.getElementById('googlemaps'), {
        zoom: 5,
        center: new google.maps.LatLng(10, 10)
    });

    geocoder = new google.maps.Geocoder();

    // Set focus to address field
    document.getElementById('inputField').focus();

    // Bind click event listener for search button
    document.getElementById("continue").addEventListener('click', codeAddress, false);

    // Bind key-up event listener for address field
    document.getElementById("inputField").addEventListener('keyup', function (event) {

        // Check the event key code
        if (event.keyCode == 13) {

            // Key code 13 == Enter key was pressed (and released)
            codeAddress();
            
        }
    });
}

function codeAddress() {

    var address = document.getElementById("inputField").value;

    geocoder.geocode({
        'address': address,
    }, function (results, status) {

        if (status == google.maps.GeocoderStatus.OK) {

            map.setCenter(results[0].geometry.location);

           pyrmont.lng = results[0].geometry.bounds["b"].b;
           pyrmont.lat = results[0].geometry.bounds["f"].b;
console.log(pyrmont)
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
                
            
            
            });
            places();
console.log(pyrmont)

            
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
    console.log('running21')
    
}

document.body.onload = initialize();


function places(){
var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, function(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
          
          console.log(place);
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
  
}


$("#filterLibrary").on('click', function(){
    request.types = ['library']
    codeAddress();
})

$("#filterCafe").on('click', function(){
    request.types = ['Cafe']
    places();
})
