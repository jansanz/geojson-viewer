$(document).ready(function() {
	initialize();

	$('#load-button').click(function () {

		var geojsonText = $("#geojson_textarea").val();

		if (geojsonText.length > 0) {
			loadGeoJSON(geojsonText);
		} else {
			$("#alert-area").append($("<div class='alert alert-error'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong>Write some text into the form</strong></div>"));
		}

		
    });
});

var map;

function initialize() {
	var mapOptions = {
	  center: new google.maps.LatLng(0, 0),
	  zoom: 2,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map_canvas"),
	    mapOptions);
}

function loadGeoJSON(textString) {
	var parsed = jQuery.parseJSON(textString);
	// Get array of coordinates
	var coordinates = parsed.coordinates;

	jQuery.each(coordinates, function() {

		var polygon = [];

		jQuery.each(this[0], function(i, val) {

			polygon.push(new google.maps.LatLng(val[1], val[0]));
			// console.log(val[0] + " / " + val[1]);
		});

		var somePolygon = new google.maps.Polygon({
			paths: polygon,
			strokeColor: "#FF0000",
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: "#FF0000",
			fillOpacity: 0.35
		});

		somePolygon.setMap(map);
    
	});

      // $("#" + this).text("My id is " + this + ".");
      // return (this != "four"); // will stop running to skip "five"
}