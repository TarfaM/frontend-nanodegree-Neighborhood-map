var num = 12;
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
        //var map = [];
        //  var map = new google.maps.Map(document.getElementsByClassName("row")[0].getElementsByClassName("col-lg-6")[0].getElementById('map'), {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 24.782661,
                lng: 46.629109
            },
            zoom: num
        });
        // var infowindow = new google.maps.InfoWindow();
        var i;
        var largeInfowindow = new google.maps.InfoWindow();
        var bounds = new google.maps.LatLngBounds();
        // var largeInfowindow = new google.maps.InfoWindow({
        var marker;
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
            // var markers =[];
            var markers = [];
            this.markers = ko.observableArray("");
            markers.push(marker);
            locations[i].marker = marker;
            bounds.extend(marker.position);
            marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
            // infowindow.open(map ,marker);
            });
        }//end loop

        function populateInfoWindow(marker, infowindow) {
                if (infowindow.marker != marker) {
                    infowindow.marker = marker;
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                    trunOffBounce(marker);
                    infowindow.setContent('<div>' + marker.title + '</div>');
                    infowindow.open(map, marker);
                    marker.addListener('closeclick', function() {
                    infowindow.setMarker(null);
                    // infowindow.open(map ,marker);
                    });
                }
            } //populateInfoWindow
    } //initMap

function locationobj(title, lat, lng, details ,marker) {
    this.title = ko.observable(title);
    this.lat = ko.observable(lat);
    this.lng = ko.observable(lng);
    this.details = ko.observable(details);
    this.marker = ko.observable(marker);

    this.clickMe = function(data, event) {
        var target;
        if (event.target) target = event.target;
        else if (event.srcElement) target = event.srcElement;
        //  console.log(locations);
        for (var i = 0; i < locations.length; i++) {
            // console.log (locations[i].title==title);
            if (locations[i].title == title) {
                var infowindow = new google.maps.InfoWindow();
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
    self.query = ko.observable("");
    self.filteredLocations = ko.computed(function() {
        var filter = self.query().toLowerCase();
        if (!filter) {
            return self.locationobjs();
        } else {
            return ko.utils.arrayFilter(self.locationobjs(), function(item) {
                // console.log(item.title());
                // populateInfoWindow2(item.marker(), infowindow,item.marker.lat(),item.marker.lng());
                // item.marker().setAnimation(google.maps.Animation.BOUNCE);
                // trunOffBounce(item.marker());
                //set marker + show contetn
                // return item.title().toLowerCase().indexOf(filter) !== -1;

                        // var isMatching = item.title().toLowerCase().indexOf(filter) >= 0;
                        var isMatching = item.title().toLowerCase().indexOf(filter) !== -1;
                        if (isMatching) {
                          //  item.marker.setAnimation(google.maps.Animation.BOUNCE);
                          // trunOffBounce(item.marker());
                                      // show markers here
                      var infowindow = new google.maps.InfoWindow();
                      populateInfoWindow2(item.marker(), infowindow, item.lat(), item.lng());
                      var slectedMarker =item.marker();
                      slectedMarker.setAnimation(google.maps.Animation.BOUNCE);
                      // this.setAnimation(google.maps.Animation.BOUNCE);
                      //trunOffBounce(item.marker());
                            console.log(item);
                        } else {
                            // hide marker here
                            //console.log(item);
                        }

                        return isMatching;


            });
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
        var marker =locations[i].marker;
        mymodel.locationobjs.push(new locationobj(title, lat, lng, details,marker));

    }
}

function populateInfoWindow2(marker, infowindow, lan, lng) {

        if (infowindow.marker != marker) {
            infowindow.marker = marker;
            var phone, address, name;
            var apiURL = 'https://api.foursquare.com/v2/venues/';
            var foursquareClientID = 'WPGVLH0N5HSOOVKJUASAX0N4KWP0PWZDOOYJZLDHYVIJEH3S';
            var foursquareSecret = 'GAQGBLH5Q3YEJHFJVCBUDSDLJL5RYMJEK3DQYJEQWMALQ1KW';
            var venueFoursquareID = "20161016";
            var foursquareURL = apiURL + 'search?v=' + venueFoursquareID + '&ll=' + lan + ',' + lng + '&intent=checkin&' + 'client_id=' + foursquareClientID + '&client_secret=' + foursquareSecret;
            console.log(foursquareURL);
            $.ajax({
                url: foursquareURL,
                success: function(data) {
                    phone = data.response.venues[0].contact.phone;
                    address = data.response.venues[0].location.address;
                    name = data.response.venues[0].name;
                    this.phone = ko.observable(phone);
                    if (phone === "" || phone === null ||typeof phone == 'undefined') {
                        phone = "Not avilable";
                    }
                    if (address === "" || address === null|| typeof address == 'undefined') {
                        address = "Not avilable";
                    }
                    if (name === "" || name === null|| typeof name == 'undefined' ) {
                        name = "Not avilable";
                    }
                    infowindow.setContent('<div>' + 'Name :' + name + '/' + marker.title + '<br>' + 'PHONE(#) :' + phone + ' Address : ' + address + '</div>');
                    infowindow.open(map, marker);

                    marker.addListener('closeclick', function() {
                        // infowindow.open(map ,marker);

                    });
                },
                error: function(error) {
                    alert("location details are not available now , please try again.");
                }
            });

        } //END IF


    } //populateInfoWindow
function trunOffBounce(marker) {
    setTimeout(function() {
        marker.setAnimation(null);
    }, 3000);
}
