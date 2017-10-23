
var num = 12 ;
 var locations = [
   {title:'Danube Hypermarket Al Malqa' ,details:"Place1",location: {lat: 24.807972, lng: 46.615403},marker:null},
   {title:'The Nail Corner' ,details:"Place2",location: {lat: 24.807018, lng: 46.615768},marker:null},
   {title:'Tilal AlRiyadh' ,details:"Place3",location: {lat: 24.800887, lng: 46.611532},marker:null},
   {title:'Kingdom Hospital' ,details:"Place4",location: {lat: 24.801347, lng: 46.654247},marker:null},
   {title:'Al-Faisal International Academy' ,details:"Place5",location: {lat: 24.790060, lng: 46.657703},marker:null}
 ];


  function initMap() {
   var map = [] ;
        //  var map = new google.maps.Map(document.getElementsByClassName("row")[0].getElementsByClassName("col-lg-6")[0].getElementById('map'), {
         var map = new google.maps.Map(document.getElementById('map'), {
           center: {lat: 24.782661, lng: 46.629109},
            zoom: num
          });
          //uluru ={lat: 24.783495, lng: 46.621242};
            // this.availableOptioons = ko.observableArrayPlaces([{
            //   {title:'Danube Hypermarket Al Malqa' ,location: {lat: 24.807972, lng: 46.615403}},
            //   {title:'The Nail Corner ركن الأظافر' ,location: {lat: 24.807018, lng: 46.615768}},
            //   {title:'Tilal AlRiyadh' ,location: {lat: 24.800887, lng: 46.611532}}
            //     }]);

    //  var locations = [
    //    {title:'Danube Hypermarket Al Malqa' ,location: {lat: 24.807972, lng: 46.615403}},
    //    {title:'The Nail Corner ركن الأظافر' ,location: {lat: 24.807018, lng: 46.615768}},
    //    {title:'Tilal AlRiyadh' ,location: {lat: 24.800887, lng: 46.611532}}
    //  ];



// var infowindow = new google.maps.InfoWindow();
var i  ;
var largeInfowindow = new google.maps.InfoWindow();
var bounds = new google.maps.LatLngBounds();
// var largeInfowindow = new google.maps.InfoWindow({
// content: 'hello '
// content: 'مدرسة شروقه '
// content :'هاذي مدرسه شروقه الحلوه'
                //  });
      // for (i ; i<locations.length ; i++)
      for (i = 0; i < locations.length; i++)
      {
        var position = locations[i].location;
          var title = locations[i].title;
          var marker = new google.maps.Marker({
                  map: map ,
                  position: position,
                  title:title,
                  animation:google.maps.Animation.DROP,
                  id:i
                });
        // var markers =[];
        // var markers =[];
          this.markers = ko.observableArray("");
          markers.push(marker);
          bounds.extend(marker.position);
          marker.addListener('click',function() {
          populateInfoWindow(this,largeInfowindow);
     // infowindow.open(map ,marker);
                     });
  }

  function populateInfoWindow (marker,infowindow ){

if (infowindow.marker !=marker){
  infowindow.marker = marker;
  infowindow.setContent('<div>' + marker.title + '</div>');
  infowindow.open(map , marker);
  marker.addListener('closeclick',function(){
  infowindow.setMarker(null);
// infowindow.open(map ,marker);
             });
 }
}//populateInfoWindow
function ViewModel(model) {
    this.booleanValue = ko.observable(false);
    this.availableOptioons = ko.observableArray([{
        text: "All",
        key:1,
        details:'place 1',
        locations:null,
        id: true
    }, {
        text: "None",
        key:2,
        details:'place 2',
        locations:null,
        id: false
    }]);
}
// ko.applyBindings(new ViewModel());

  }//initMap

  // function employee(title, lat,lng) {
  function employee(title,lat,lng,details) {
      this.title = ko.observable(title);
      // this.location = ko.observable(location);
      // this.position = ko.observable(position);
      this.lat = ko.observable(lat);
      this.lng = ko.observable(lng);
      this.details = ko.observable(details);
        // this.locations = ko.observableArray("");
      this.clickMe = function(data,event) {
      var target;
      if (event.target) target = event.target;
      else if (event.srcElement) target = event.srcElement;
      if (target.nodeType == 3) // defeat Safari bug
      target = target.parentNode;
    //  console.log ("locations"+locations);
      markers.removeAll();
      //initMap();
    //  console.log ("markers---"+markers);

      // target.parentNode.innerHTML = "something";
  }}

  function model() {
      var self = this;
      self.employees = ko.observableArray("");
      self.query = ko.observable("");
      self.filteredEmployees = ko.computed(function () {
          var filter = self.query().toLowerCase();

          if (!filter) {
              return self.employees();
          } else {
              return ko.utils.arrayFilter(self.employees(), function (item) {
                //location: {lat: 24.807972, lng: 46.615403}
                // var position2 = [{location: {lat: item.lat(), lng: item.lng()}}];
            //  var     position2 ={location: {lat: 24.800887, lng: 46.611532}}
            //  var position2 = locations[0].location;
                // [parseFloat(item.lat()),parseFloat(item.lng())];
            //    console.log("position2"+position2);
                // var map2 = CreateinitMap(item.lat(),item.lng(),12);
                // var map2 = new google.maps.Map(document.getElementById('map'), {
                //   center: {lat: item.lat(), lng: item.lng()},
                //    zoom: 12
                //  });
              //  var marker =Setmarker(map2,item.lat(),item.lng(),item.title());
              //  var largeInfowindow2 = new google.maps.InfoWindow();
              // populateInfoWindow2(this,largeInfowindow2);
                  // var marker = new google.maps.Marker({
                  //       map: map2 ,
                  //       position: {lat: item.lat(), lng:item.lng()},
                  //       // position: position2,
                  //       title:item.title(),
                  //       animation:google.maps.Animation.DROP
                  //       // id:i,
                  //     });
                        // console.log("position"+item.lat(),item.lng());
                      // item.marker =marker;
                //item.marker.setVisable(true);
                  return item.title().toLowerCase().indexOf(filter) !== -1;
                    // console.log("Afterretruen --position2"+position2);
              });
          }
      });
  }

  var mymodel = new model();

  $(document).ready(function () {
      loaddata();
      ko.applyBindings(mymodel);
  });


  function loaddata() {
    for (var i = 0; i < locations.length ; i++)
    {
      var lat = locations[i].location.lat;
      var lng = locations[i].location.lng;
      var title = locations[i].title;
      var details=locations[i].details;
      mymodel.employees.push(new employee(title,lat,lng,details));

        // var position = locations[i].location;
      // mymodel.employees.push(new locations[1].location);
      // mymodel.employees.push(new locations[2].location);
    }
      // mymodel.employees.push(new employee("oDanube Hypermarket Al Malq" , "24.800887",  "24.800887"));
      // mymodel.employees.push(new employee("pDanube Hypermarket Al Malq" , "24.800887", "24.800887"));
      // mymodel.employees.push(new employee("pDanube Hypermarket Al Malq" , "24.800887", "24.800887"));
  }


  function CreateinitMap(lat ,lng ,num) {
         var map = new google.maps.Map(document.getElementById('map'), {
           center: {lat: lat, lng: lng},
            zoom: num
          });
        };


function Setmarker(map,lat,lng,title) {
  var marker = new google.maps.Marker({
        map: map ,
        position: {lat:lat, lng:lng},
        title:title,
        animation:google.maps.Animation.DROP
        // id:i,
      });

};

function populateInfoWindow2 (marker,infowindow ){

if (infowindow.marker !=marker){
infowindow.marker = marker;
infowindow.setContent('<div>' + marker.title + '</div>');
infowindow.open(map , marker);
marker.addListener('closeclick',function(){
infowindow.setMarker(null);
// infowindow.open(map ,marker);
           });
}
}//populateInfoWindow
