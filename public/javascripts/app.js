$(document).ready(wait()); 
$(function() {
    L.mapbox.accessToken = 'pk.eyJ1IjoiYmthaGxlciIsImEiOiJjaWxmaHNwZHkxcXVydHZrcHp5cmE4bHM5In0.dKkkzvffVWeAhlsq8cnuww';
    var map = L.mapbox.map('map', 'bkahler.pb42p70m');
    
    $("#rsvp-toggle").on("click", function(){
    	$("#rsvp-div").fadeToggle(2000, function(){
    		console.log("Toggled!");
    	});
    	$("#rsvp-toggle").fadeToggle(2000, function(){
    		console.log("Toggled!");
    	});
    });
    
    
    var data = {
  // A labels array that can contain any sort of values
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  // Our series array that contains series objects or in this case series data arrays
  series: [
    [5, 2, 4, 2, 0]
  ]
};

// Create a new line chart object where as first parameter we pass in a selector
// that is resolving to our chart container element. The Second parameter
// is the actual data object.
new Chartist.Line('.ct-chart', data);
        
});


function wait(){
  setTimeout(fade_flash, 2000);
}

function fade_flash() {
  $('#flash').fadeOut();
}

