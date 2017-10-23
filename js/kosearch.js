// function employee(firstName, lastName, department) {
function employee(title, lat,lng) {
    this.title = ko.observable(title);
    // this.location = ko.observable(location);
    this.lat = ko.observable(lat);
    this.lng = ko.observable(lng);
    this.clickMe = function(data,event) {
    var target;
    if (event.target) target = event.target;
    else if (event.srcElement) target = event.srcElement;
    if (target.nodeType == 3) // defeat Safari bug
    target = target.parentNode;
    //target.parentNode.innerHTML = "something";
}

    //  this.location = ko.observableArray([
    //    {lat:"",lng:""}
    //
    // ]);
    // this.department = ko.observable(department);





      // {title:'Danube Hypermarket Al Malqa' ,location: {lat: 24.807972, lng: 46.615403}},
      // {title:'The Nail Corner ركن الأظافر' ,location: {lat: 24.807018, lng: 46.615768}},
      // {title:'Tilal AlRiyadh' ,location: {lat: 24.800887, lng: 46.611532}}
        // this.firstName = ko.observable(firstName);
    // this.lastName = ko.observable(lastName);
    // this.department = ko.observable(department);
}



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
                return item.title().toLowerCase().indexOf(filter) !== -1;
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
    // mymodel.employees.push(new employee("Danube Hypermarket Al Malq", location[24.807972,46.615403]));
    // mymodel.employees.push(new employee("dDanube Hypermarket Al Malq",{lat:"24.800887",lng:"46.611532"}));
    mymodel.employees.push(new employee("oDanube Hypermarket Al Malq" , "24.800887",  "24.800887"));
    mymodel.employees.push(new employee("pDanube Hypermarket Al Malq" , "24.800887", "24.800887"));
    mymodel.employees.push(new employee("pDanube Hypermarket Al Malq" , "24.800887", "24.800887"));
     // mymodel.employees.push(new employee("Mary", "Smith", "HR"));
    // mymodel.employees.push(new employee("Greg", "Black", "Finance"));
}
