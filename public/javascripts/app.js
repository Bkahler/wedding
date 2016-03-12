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
        
});


function wait(){
  setTimeout(fade_flash, 2000);
}

function fade_flash() {
  $('#flash').fadeOut();
}