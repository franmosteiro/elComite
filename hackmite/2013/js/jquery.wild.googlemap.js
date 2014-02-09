// JQuery Wild Googlemap
// Emanuele Franceschini
// v. 123011

// GOOGLE MAP
var googlemap_maps			= [];
var googlemap_markers 		= [];
var googlemap_infowindows	= [];

// Add map
function googlemap_add_map(_code, _lat, _lng, _zoom, _vars)
{
	if(_vars == undefined) _vars = new Array();

	var mapTypeId = google.maps.MapTypeId.ROADMAP;
	if(_vars['mapTypeId'] != undefined)
	{
		if(_vars['mapTypeId'] == "SATELLITE") 		mapTypeId = google.maps.MapTypeId.SATELLITE;
		else if(_vars['mapTypeId'] == "HYBRID") 	mapTypeId = google.maps.MapTypeId.HYBRID;
		else if(_vars['mapTypeId'] == "TERRAIN") 	mapTypeId = google.maps.MapTypeId.TERRAIN;
	}

	var options =
	{
		zoom: 		_zoom,
		center: 	new google.maps.LatLng(_lat, _lng),
		mapTypeId: 	mapTypeId,
		streetViewControl: 	_vars['streetViewControl'] != undefined ? _vars['streetViewControl'] 	: true,
		navigationControl: 	_vars['navigationControl'] != undefined ? _vars['navigationControl'] 	: true,
		mapTypeControl: 	_vars['mapTypeControl'] != undefined 	? _vars['mapTypeControl'] 		: true,
		draggable:			_vars['draggable'] != undefined 		? _vars['draggable'] 			: true,
		scrollwheel:		_vars['scrollwheel'] != undefined 		? _vars['scrollwheel'] 			: true,
		width:				100,
		height:				200
	};
	googlemap_maps[_code] 			= new google.maps.Map(document.getElementById(_code), options);
	googlemap_infowindows[_code] 	= new Array();
}

// Add marker
function googlemap_add_marker(_mapcode, _code, _title, _lat, _lng, _icon, _shadow, _draggable, _panOnDrag)
{
	var point = new google.maps.LatLng(_lat, _lng);

	if(_lat == undefined) _lat = 0;
	if(_lng == undefined) _lng = 0;

	googlemap_markers[_code] = new google.maps.Marker(
	{
		position: 	point,
		title:		_title,
		icon: 		(_icon == undefined ? '' : _icon),
		shadow:		(_shadow == undefined ? '' : _shadow)
	});

	googlemap_markers[_code].setMap(googlemap_maps[_mapcode]);

	if(_draggable != undefined && _draggable === true)
	{
		googlemap_markers[_code].setDraggable(true);

		if(_panOnDrag != undefined && _panOnDrag === true)
		{
			google.maps.event.addListener(googlemap_markers[_code], "dragend", function(event)
			{
				var point = googlemap_markers[_code].getPosition();
				googlemap_maps[_mapcode].panTo(point);
				$("input[name=lat]").val(point.lat());
				$("input[name=lng]").val(point.lng());
			});
		}
	}
}

// Add tooltip
function googlemap_add_infowindow(_mapcode, _markercode, _content, _zoom)
{
	// Remove if already exists
	if(googlemap_infowindows[_mapcode][_markercode] !== undefined)
	{
		googlemap_infowindows[_mapcode][_markercode].close();
		delete googlemap_infowindows[_mapcode][_markercode];
	}

	// Add tooltip
	googlemap_infowindows[_mapcode][_markercode] = new google.maps.InfoWindow(
	{
		content: _content
	});

	// Bind marker click
	google.maps.event.addListener(googlemap_markers[_markercode], "click", function(event)
	{
		if(_zoom !== false)
		{
			var zoom = (_zoom == undefined ? 9 : _zoom);
			googlemap_maps[_mapcode].setZoom(zoom);
		}
		googlemap_show_infowindow(_mapcode, _markercode, _zoom !== false, false);
	});
}

// Show tooltop
function googlemap_show_infowindow(_mapcode, _markercode, _panTo, _span)
{
	// Close opened tooltips
	googlemap_close_infowindow(_mapcode);

	// Show
	googlemap_infowindows[_mapcode][_markercode].open(googlemap_maps[_mapcode], googlemap_markers[_markercode]);

	// Panto
	if(_panTo != undefined && _panTo === true)
	{
		var point = googlemap_markers[_markercode].getPosition();
		if(_span != undefined && _span === true)
			point = new google.maps.LatLng(point.lat() + googlemap_get_tooltip_span(_mapcode), point.lng());
		googlemap_maps[_mapcode].panTo(point);
	}
}

// Close tooltips
function googlemap_close_infowindow(_mapcode)
{
	for (var markercode in googlemap_infowindows[_mapcode])
	{
		googlemap_infowindows[_mapcode][markercode].close();
	}
}

// Tooltip onclose
function googlemap_onclose_infowindow(_mapcode, _markercode, _var)
{
	if(_var == undefined) return;

	// Close
	google.maps.event.addListener(googlemap_infowindows[_mapcode][_markercode], "closeclick", function(event)
	{
		if(_var['zoom'] != undefined)
			googlemap_maps[_mapcode].setZoom(_var['zoom']);
		if(_var['lat'] != undefined && _var['lng'] != undefined)
			googlemap_maps[_mapcode].setCenter(new google.maps.LatLng(_var['lat'], _var['lng']));
	});
}

// Span tooltip
function googlemap_get_tooltip_span(_mapcode)
{
	var zoom = googlemap_maps[_mapcode].getZoom() - 10;
	var span = 0.07;

	if(zoom < 0)
	{
		for(i = zoom; i < 0; i++) span *= 2;
	}
	else if(zoom > 0)
	{
		for(i = 0; i < zoom; i++) span /= 2;
	}
	return span;
}

// Set address to marker
function googlemap_set_marker_address(_mapcode, _markercode, _address, _region, _panTo, _zoom)
{
	var lat	= 0;
	var lng	= 0;

	var geocoder = new google.maps.Geocoder();
	geocoder.geocode( { 'address': _address, 'region': _region }, function(results, status)
	{
		//console.log(results);
		if (status == google.maps.GeocoderStatus.OK)
		{
			lat = results[0].geometry.location.lat();
			lng = results[0].geometry.location.lng();

			var point = new google.maps.LatLng(lat, lng);
			googlemap_markers[_markercode].setPosition(point);

			if(_panTo != undefined  && _panTo === true)
				googlemap_maps[_mapcode].panTo(point);

			if(_zoom != undefined)
				googlemap_maps[_mapcode].setZoom(_zoom);

			$("input[name=lat]").val(point.lat());
			$("input[name=lng]").val(point.lng());

			return true;
		}
		else
		{
			alert("Indirizzo non trovato");
			return false;
		}
	});
}

// Center map to marker
function googlemap_center_map_to_marker(_mapcode, _markercode)
{
	var point = googlemap_get_marker_position(_markercode);
	googlemap_maps[_mapcode].setCenter(new google.maps.LatLng(point.lat(), point.lng()));
}

function googlemap_set_map_zoom(_mapcode, _zoom)
{
	googlemap_maps[_mapcode].setZoom(_zoom);
}

function googlemap_set_icon(_markercode, _icon)
{
	googlemap_markers[_markercode].setIcon(_icon);
	googlemap_markers[_markercode].setShadow(_icon.substr(0,_icon.length - 4)  + ".shadow.png");
}

// Get
function googlemap_get_map_center(_mapcode)
{
	return googlemap_maps[_mapcode].getCenter();
}

function googlemap_get_map_zoom(_mapcode)
{
	return googlemap_maps[_mapcode].getZoom();
}

function googlemap_get_marker_position(_markercode)
{
	return googlemap_markers[_markercode].getPosition();
}