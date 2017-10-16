function sanitizeCity(city){														 
	return city.split(/[\s,]+/).join('+').toLowerCase();
}

function getZip(){
	var city = $('#loc').val();
  	city = sanitizeCity(city);
  
	$.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address=' + city + '&sensor=true', function(json){
		var lat = json.results[0].geometry.location.lat;
		var lng = json.results[0].geometry.location.lng;
		$.getJSON('https://maps.googleapis.com/maps/api/geocode/json?latlng='+ lat + ',' + lng + '&sensor=true', function(json){
			var dataArr = json.results[0].address_components;
			for(i=0; i<dataArr.length; i++){
				if(dataArr[i].types[0] == "postal_code"){
					$('#result').html(dataArr[i].short_name);
				}
			}	
		});
	}); 
}

$(document).ready(function(){
	$('#locbtn').on('click', function(){
		getZip();
	});

	$('#loc').keyup(function(event){
    	if(event.keyCode == 13){
        	$('#locbtn').click();
    	}
	});
});