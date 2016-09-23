$(document).ready(
    wait()
  ); 

// Incase we want more than a static map.
// function addMap(){
//     L.mapbox.accessToken = 'pk.eyJ1IjoiYmthaGxlciIsImEiOiJjaWxmaHNwZHkxcXVydHZrcHp5cmE4bHM5In0.dKkkzvffVWeAhlsq8cnuww';
//     var map = L.mapbox.map('map', 'bkahler.pb42p70m',{
//         zoomControl: false,
//     }).setView([37.846, -122.23], 17);
    
//     map.dragging.disable();
//     map.touchZoom.disable();
//     map.doubleClickZoom.disable();
//     map.scrollWheelZoom.disable();
//     map.keyboard.disable();
// };



function addClickHandlers(){
    $("#rsvp-toggle").on("click", function(){
      
    	$("#rsvp-form").fadeToggle(2000, function(){
    		console.log("Toggled!");
    	});
    	
    	$("#rsvp-toggle").fadeToggle(2000, function(){
    		console.log("Toggled!");
    	});
    	
    });
    
    $('#schedule-scroll').click(function(){
        $('html, body').animate({
            scrollTop: ($('.schedule').offset().top)
        },500);
    });    
    
    $('#venue-scroll').click(function(){
         $('html, body').animate({
            scrollTop: ($('.venue').offset().top)
        },1000);
    });   
    
    $('#gifts-scroll').click(function(){
         $('html, body').animate({
            scrollTop: ($('.gifts').offset().top)
        },1000);
    });   
    
    $('#us-scroll').click(function(){
         $('html, body').animate({
            scrollTop: ($('.us').offset().top)
        },1000);
    });
    
    $('#contact-scroll').click(function(){
         $('html, body').animate({
            scrollTop: ($('.contact').offset().top)
        },1000);
    });
}

function chartPrep() {
    $("#showChart").click(function(){
    	
    	$("#chart").fadeToggle(2000, function(){
    		console.log("Toggled!");
    	});
    	
      addChart();
    });
}

function wait(){
  setTimeout(fade_flash, 2000);
  setTimeout(chartPrep, 1000);
  setTimeout(addClickHandlers, 500);
  setTimeout(addMap,500);
}

function fade_flash() {
//   $('#flash').fadeOut();
  $('#flash').fadeTo( "slow" , 0.0);
}

function addChart(){
  var pieData = [
     {
        value: 25,
        label: 'NO',
        color: '#811BD6'
     },
     {
        value: 10,
        label: 'YES',
        color: '#9CBABA'
     },     
     {
        value: 60,
        label: '??',
        color: '#1abc9c'
     }
  ];
  
  var context = document.getElementById('chart').getContext('2d');
  var skillsChart = new Chart(context).Pie(pieData);
  
}
