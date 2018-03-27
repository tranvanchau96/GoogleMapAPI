function initMap() {};

$(function(){
	// 'user strick';
  var map;
                                                          
  var LatLng1,LatLng2,pos,LatLng3;
  
  var markers = [];
  var markers2 = [];

  var infowindow;
  // Khoi tao danh sach dia diem
  var countries = {
        'hn': {
          center: {lat: 21.025679, lng: 105.837227},
          zoom: 12
        },
        'hp': {
          center: {lat: 20.847489, lng: 106.698188},
          zoom: 12
        },
        'tb': {
          center: {lat: 20.463752, lng: 106.362309},
          zoom: 12
        },
        'na': {
          center: {lat: 18.754104, lng: 105.529658},
          zoom: 12
        },
        'tth': {
          center: {lat: 16.452401, lng: 107.561418},
          zoom: 12
        },
        'dn': {
          center: {lat: 16.055126, lng: 108.204002},
          zoom: 12
        },
        'kh': {
          center: {lat: 12.251262, lng: 109.119962},
          zoom: 12
        },
        'ld': {
          center: {lat: 11.936486, lng: 108.444196},
          zoom: 12
        },
        'hcm': {
          center: {lat: 10.784650, lng: 106.657784},
          zoom: 12
        },
        'vt': {
          center: {lat: 10.483885, lng: 107.166145},
          zoom: 12
        },
        'dt': {
          center: {lat: 10.467208, lng: 105.659046},
          zoom: 12
        },
         'bt': {
          center: {lat: 10.211328, lng: 106.413940},
          zoom: 12
        },
        'ct': {
          center: {lat: 10.028456, lng: 105.767577},
          zoom: 12
        },
        'st': {
          center: {lat: 9.604564, lng: 105.976010},
          zoom: 12
        },
        'cm': {
          center: {lat: 9.173324, lng: 105.165196},
          zoom: 12
        },
      };
	
  var mapDiv = document.getElementById('map');

	var myLatlon = new google.maps.LatLng(10.850, 106.650);
  var bounds = new google.maps.LatLngBounds();

//Init
	initMap = function(){
                                                                           
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;

		map = new google.maps.Map(mapDiv, {
			center: myLatlon,
      	zoom: 8,
      	//mapTypeId: google.maps.MapTypeId.ROADMAP,
      	mapTypeId: 'roadmap'
		});

    infowindow = new google.maps.InfoWindow();
    infowindow2 = new google.maps.InfoWindow();

    document.getElementById('country').addEventListener(
      'change', setAutocompleteCountry);

    // Tim kiem khi click vao nut tim kiem 
    var findbtt = document.getElementById('findbt');
    google.maps.event.addDomListener(findbtt, 'click', find);

    // Xoa bo Marker cu
    document.getElementById('country').addEventListener(
      'change', deleteMarkers);
    document.getElementById('choose').addEventListener(
      'change', deleteMarkers);

    document.getElementById('choose').addEventListener(
      'change', find);

    // Xoa Marker tìm kiếm khi rightclick
    google.maps.event.addDomListener(map, 'rightclick', deleteMarkers);

    // Xoa duong di khi rightclick
    map.addListener('rightclick',function(){
    	directionsDisplay.setMap(null);
    })

    directionsDisplay.setPanel(document.getElementById('right-panel'));

    var onChangeHandler = function() {
      calculateAndDisplayRoute(directionsService, directionsDisplay);
      //Hiện chi tiết chỉ đường
      $(document).ready(function(){
        $("#right-panel").show();
      });
    };
    
    var imgbutton = document.getElementById('btDirect');
    google.maps.event.addDomListener(imgbutton , 'click', onChangeHandler);

	  var service = new google.maps.places.PlacesService(map);

		mapSearchbox();
	  mapSearchbox1();
    mapSearchbox2();
    geolocate();
  };
	//end of initMap

//Tim kiem theo khu vuc
  function find() {
    var country = document.getElementById('country').value;
    var choosee = document.getElementById('choose').value;
    var service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: countries[country].center,
        radius: 20000,
        type: choosee
      }, callback);
  }
  //end of find

  // Tao Marker cho moi dich vu     
  function addMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      position: place.geometry.location,
      map: map
    });
    markers.push(marker);
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {

    for (var i = 0; i < results.length; i++) {
      // createMarker(results[i]);
      addMarker(results[i]);
      }
    }
  }

  function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  function clearMarkers() {
    setMapOnAll(null);
  }

  function deleteMarkers() {
    clearMarkers();
    markers = [];
  }

  function setAutocompleteCountry() {
    var country = document.getElementById('country').value;
    if (country == 'all') {
      map.setCenter({lat: 15, lng: 0});
      map.setZoom(2);
    } else {
      map.setCenter(countries[country].center);
      map.setZoom(countries[country].zoom);
    }
  }

//Chỉ đường 
  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsDisplay.setMap(map);
    directionsService.route({
      origin: LatLng1,
      destination: LatLng2,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  } //end of calculateAndDisplayRoute

//Lấy vị trí hiện tại
	function GeolocationControl() {
    var geoButton = document.getElementById('mylocation');
    google.maps.event.addDomListener(geoButton, 'click', geolocate);
    google.maps.event.addDomListener(geoButton, 'click', markerLocation);

  };  //end of GeolocationControl
 
  function geolocate() {
    //infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position);
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(pos);
      }, );
    } else {
      alert("no location");
    }
  }  //end of geolocate

  //Tạo Marker cho vị trí hiện tại
  function markerLocation() {
    var imgMylocation = 'locationicon.png';
    map.setZoom(16);
    var marker = new google.maps.Marker({
      icon:imgMylocation,
      position: pos,
      animation: google.maps.Animation.DROP,
      map :map
    });
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent("My Location");
      infowindow.open(map, this);
      map.setZoom(16);
      map.setCenter(pos);
    });
  } //end of markerLocation

//Hop tim kiem SearchBox
  function mapSearchbox() {
    var input = document.getElementById('pacinput');
    var searchBox = new google.maps.places.SearchBox(input);
    
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Lang nghe su kien khi nguoi dung lua chon.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Xoa Marker cua dia diem tim kiem truoc do.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // Lay thong tin cho moi dia diem
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Tao marker cho moi dia diem.
        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }
  
//Chi duong tu 2 dia diem su dung SearchBox
  function mapSearchbox1() {
    var input1 = document.getElementById('position1');
    var searchBox = new google.maps.places.SearchBox(input1);

    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {

        LatLng1 = place.geometry.location;    //Lấy vị trí chỉ đường thứ nhất

        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };
        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }
  
  function mapSearchbox2() {
    var input2 = document.getElementById('position2');
    var searchBox = new google.maps.places.SearchBox(input2);
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {

        LatLng2 = place.geometry.location;   //Lấy vị trí chỉ đường thứ 2

        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }
  
  initMap();
  GeolocationControl();
	
});