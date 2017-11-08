var num = 12;
var infowindow = '';

var locations = [{
    title: 'Danube Hypermarket Al Malqa',
    details: "Place1",
    location: {
        lat: 24.807972,
        lng: 46.615403
    }
}, {
    title: 'The Nail Corner',
    details: "Place2",
    location: {
        lat: 24.807018,
        lng: 46.615768
    }
}, {
    title: 'Tilal AlRiyadh',
    details: "Place3",
    location: {
        lat: 24.800887,
        lng: 46.611532
    }
}, {
    title: 'Kingdom Hospital',
    details: "Place4",
    location: {
        lat: 24.801347,
        lng: 46.654247
    }
}, {
    title: 'Al-Faisal International Academy',
    details: "Place5",
    location: {
        lat: 24.790060,
        lng: 46.657703
    }
}];

function errorGoogleMap() {
    alert('Google Maps is not available right now , Please try again.');
}

// Maps api asynchronous load code here.
var map = '';

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 24.782661,
            lng: 46.629109
        },
        zoom: num
    });

    infowindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();

    function clickMeEvent(data) {
        // stop all other bounceing
        for (var i = 0; i < locations.length; i++) {
            locations[i].marker.setAnimation(null);
        }

        data.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            data.marker.setAnimation(false);
        }, 3000);
        populateInfoWindow(data.marker);
    }

    for (var i = 0; i < locations.length; i++) {
        var position = locations[i].location;
        var title = locations[i].title;
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
        });

        marker.addListener('click', toggleBounce);
        locations[i].marker = marker;
        locations[i].clickMe = clickMeEvent;

        bounds.extend(marker.position);

    }

    ko.applyBindings(model());

} // initMap()

function populateInfoWindow(marker) {
    infowindow.marker = marker;
    var phone, address, name;
    var apiURL = 'https://api.foursquare.com/v2/venues/';
    var foursquareClientID = 'WPGVLH0N5HSOOVKJUASAX0N4KWP0PWZDOOYJZLDHYVIJEH3S';
    var foursquareSecret = 'GAQGBLH5Q3YEJHFJVCBUDSDLJL5RYMJEK3DQYJEQWMALQ1KW';
    var venueFoursquareID = "20161016";
    var foursquareURL = apiURL + 'search?v=' + venueFoursquareID + '&ll=' + marker.position.lat() + ',' + marker.position.lng() + '&intent=checkin&' + 'client_id=' + foursquareClientID + '&client_secret=' + foursquareSecret;
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

function toggleBounce() {
    var self = this;
    if (self.getAnimation() !== null) {
        self.setAnimation(null);
        infowindow.close();
    } else {
        self.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            self.setAnimation(false);
        }, 3000);
        populateInfoWindow(self);
    }
}

function stopAllBounce() {
    for (var i = 0; i < locations.length; i++) {
        locations[i].marker.setAnimation(null);
    }
}

function model() {
    var self = this;
    self.LocationObj = ko.observableArray(locations);
    self.query = ko.observable("");
    self.filteredLocations = ko.computed(function() {
        var filter = self.query().trim();
        if (filter === '') {
            // if (!(filter.length > 0)) {
            // if (!filter.length > 0) {
            stopAllBounce();
            infowindow.close();
            for (var i = 0; i < self.LocationObj().length; i++) {
                self.LocationObj()[i].marker.setVisible(true);
            }
            return self.LocationObj();
        }

        return ko.utils.arrayFilter(self.LocationObj(), function(item) {
            var matches = item.title.toLowerCase().indexOf(filter) !== -1 ? item : false;
            item.marker.setAnimation(matches);

            if (matches) {
                item.marker.setVisible(true);
                item.marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function() {
                    item.marker.setAnimation(false);
                }, 3000);
            } else {
                item.marker.setVisible(false);
                infowindow.close();
            }

            return matches;
        });

    }); // ko.computed

} //model()
//
// $(document).ready(function () {
//   ko.applyBindings(new model())
// });
