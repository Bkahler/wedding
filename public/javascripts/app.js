$(document).ready(
    wait()
  ); 

function addMap(){
    L.mapbox.accessToken = 'pk.eyJ1IjoiYmthaGxlciIsImEiOiJjaWxmaHNwZHkxcXVydHZrcHp5cmE4bHM5In0.dKkkzvffVWeAhlsq8cnuww';
    var map = L.mapbox.map('map', 'bkahler.pb42p70m');
};

function addClickHandlers(){
    $("#rsvp-toggle").on("click", function(){
      
    	$("#rsvp-div").fadeToggle(2000, function(){
    		console.log("Toggled!");
    	});
    	
    	$("#rsvp-toggle").fadeToggle(2000, function(){
    		console.log("Toggled!");
    	});
    	
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
  $('#flash').fadeOut();
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


