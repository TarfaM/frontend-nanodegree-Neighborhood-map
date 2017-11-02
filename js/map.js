var num = 12;
var marker;
var infowindow;
var map;

var locations = [{
    title: 'Danube Hypermarket Al Malqa',
    details: "Place1",
    location: {
        lat: 24.807972,
        lng: 46.615403
    },
    marker: null
}, {
    title: 'The Nail Corner',
    details: "Place2",
    location: {
        lat: 24.807018,
        lng: 46.615768
    },
    marker: null
}, {
    title: 'Tilal AlRiyadh',
    details: "Place3",
    location: {
        lat: 24.800887,
        lng: 46.611532
    },
    marker: null
}, {
    title: 'Kingdom Hospital',
    details: "Place4",
    location: {
        lat: 24.801347,
        lng: 46.654247
    },
    marker: null
}, {
    title: 'Al-Faisal International Academy',
    details: "Place5",
    location: {
        lat: 24.790060,
        lng: 46.657703
    },
    marker: null
}];

function errorGoogleMap() {
    alert('Google Maps is not available right now , Please try again.');
}
// Maps api asynchronous load code here.
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 24.782661,
            lng: 46.629109
        },
        zoom: num
    });
    infowindow = new google.maps.InfoWindow();
    var i;
    var bounds = new google.maps.LatLngBounds();
    for (i = 0; i < locations.length; i++) {
        var position = locations[i].location;
        var title = locations[i].title;
        marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
        });
        // var markers = [];
        this.markers = ko.observableArray();
        markers.push(marker);
        locations[i].marker = marker;
        bounds.extend(marker.position);
        marker.addListener('click', minFun(marker));

    } //end loop
    //to solve (Don't make functions within a loop.)
    function minFun(marker) {
        return function() {
            if (infowindow.marker != marker) {
                populateInfoWindow2(marker, infowindow, marker.position.lat(), marker.position.lng());
                marker.setAnimation(google.maps.Animation.BOUNCE);
                // largeInfowindow.open(map, marker);
                // this.setAnimation(google.maps.Animation.BOUNCE);
                trunOffBounce(this);
            }
        };
    }

    function populateInfoWindow(marker, infowindow) {
        if (infowindow.marker == marker) {
            infowindow.marker = marker;
            marker.setAnimation(google.maps.Animation.BOUNCE);
            trunOffBounce(marker);
            infowindow.setContent('<div>' + marker.title + '</div>');
            infowindow.open(map, marker);
            marker.addListener('closeclick', function() {
                // infowindow.setMarker(null);
                infowindow.open(map, marker);
            });
        }
    } //populateInfoWindow
}

function LocationObj(title, lat, lng, details, marker) {
    this.title = ko.observable(title);
    this.lat = ko.observable(lat);
    this.lng = ko.observable(lng);
    this.details = ko.observable(details);
    this.marker = ko.observable(marker);

    this.clickMe = function(data, event) {
        var target;
        if (event.target) target = event.target;
        else if (event.srcElement) target = event.srcElement;
        for (var i = 0; i < locations.length; i++) {
            if (locations[i].title == title) {
                var lat = locations[i].location.lat;
                var lng = locations[i].location.lng;
                populateInfoWindow2(locations[i].marker, infowindow, lat, lng);
                locations[i].marker.setAnimation(google.maps.Animation.BOUNCE);
                trunOffBounce(locations[i].marker);
            }
        } //end for loop
    };
}

function model() {
    var self = this;
    self.locationobjs = ko.observableArray("");
    self.allarray = ko.observableArray([]);
    self.query = ko.observable("");
    self.filteredLocations = ko.computed(function() {
        var filter = self.query().toLowerCase();
        if (!filter) {
            if (locations[0].marker) {

                ShowAllMarckers();
                infowindow.close();
            }
            return self.locationobjs();
        } else {
            return ko.utils.arrayFilter(self.locationobjs(), function(item) {
                var isMatching = item.title().toLowerCase().indexOf(filter) !== -1;
                if (isMatching === true) {
                    var allarray = self.filteredLocations();
                    var found = GetMarker(item.title());
                    DeleteAllexceptMe(found);
                    var lat1 = allarray[0].lat();
                    var lng1 = allarray[0].lng();
                    hint(found);
                    populateInfoWindow2(found, infowindow, lat1, lng1);
                    return isMatching;
                    // });
                } else {
                    DisableAllMarckers();
                    infowindow.close();

                }

            }); //end filteredLocations

        }
    });
}

var mymodel = new model();
$(document).ready(function() {
    loaddata();
    ko.applyBindings(mymodel);
});

function loaddata() {
    for (var i = 0; i < locations.length; i++) {
        var lat = locations[i].location.lat;
        var lng = locations[i].location.lng;
        var title = locations[i].title;
        var details = locations[i].details;
        var marker = locations[i].marker;
        mymodel.locationobjs.push(new LocationObj(title, lat, lng, details, marker));

    }
}

function populateInfoWindow2(marker, infowindow, lan, lng) {

    infowindow.marker = marker;
    var phone, address, name;
    var apiURL = 'https://api.foursquare.com/v2/venues/';
    var foursquareClientID = 'WPGVLH0N5HSOOVKJUASAX0N4KWP0PWZDOOYJZLDHYVIJEH3S';
    var foursquareSecret = 'GAQGBLH5Q3YEJHFJVCBUDSDLJL5RYMJEK3DQYJEQWMALQ1KW';
    var venueFoursquareID = "20161016";
    var foursquareURL = apiURL + 'search?v=' + venueFoursquareID + '&ll=' + lan + ',' + lng + '&intent=checkin&' + 'client_id=' + foursquareClientID + '&client_secret=' + foursquareSecret;
    $.ajax({
        url: foursquareURL,
        success: function(data) {
            phone = data.response.venues[0].contact.phone;
            address = data.response.venues[0].location.address;
            name = data.response.venues[0].name;
            this.phone = ko.observable(phone);
            if (phone === "" || phone === null || typeof phone == 'undefined') {
                phone = "Not avilable";
            }
            if (address === "" || address === null || typeof address == 'undefined') {
                address = "Not avilable";
            }
            if (name === "" || name === null || typeof name == 'undefined') {
                name = "Not avilable";
            }
            infowindow.setContent('<div>' + 'Name :' + name + '/' + marker.title + '<br>' + 'PHONE(#) :' + phone + ' Address : ' + address + '</div>');
            infowindow.open(map, marker);
            name = "";
            address = "";
            phone = ""; // to fix one issue
            marker.addListener('closeclick', function() {
                name = "";
                address = "";
                phone = ""; // to fix one issue
            });
        },
        error: function(error) {
            alert("location details are not available now , please try again.");
        }
    });

    //END IF

} //populateInfoWindow
function trunOffBounce(marker) {
    setTimeout(function() {
        marker.setAnimation(null);
    }, 3000);
}

function hint(marker) {
    setTimeout(function() {
        marker.setVisible(true);
    }, 3000);
}
// passing title to get Marker details -
function GetMarker(title) {
    var mk;
    for (var i = 0; i < locations.length; i++) {
        if (locations[i].title == title) {
            mk = locations[i].marker;
        }
    }
    return mk;
}

function DeleteAllexceptMe(locas) { //take array of loc and make it visible
    var mke;
    for (var i = 0; i < locas.length; i++) {
      mke[i].setVisible(true);
    }
    return locas;
}

function ShowAllMarckers() {
    var mke;
    for (i = 0; i < locations.length; i++) {
        mke = GetMarker(locations[i].title);
        mke.setVisible(true);
    }

}
function DisableAllMarckers() {
    var mke;
    for (i = 0; i < locations.length; i++) {
        mke = GetMarker(locations[i].title);
        mke.setVisible(false);
        }

}
