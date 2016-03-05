$(function() {
    L.mapbox.accessToken = 'pk.eyJ1IjoiYmthaGxlciIsImEiOiJjaWxmaHNwZHkxcXVydHZrcHp5cmE4bHM5In0.dKkkzvffVWeAhlsq8cnuww';
    var map = L.mapbox.map('map', 'bkahler.pb42p70m');
    
    
    $("#rsvp-toggle").on("click", function(){
    	$("#rsvp-form").fadeToggle(2000, function(){
    		console.log("Toggled!")
    	});
    })
    
})

