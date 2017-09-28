// var ViewModle =function(){

function ViewModle() {
this.firstName = ko.observable(this.textOfsearch);
this.textOfsearch = ko.observable("test");
console.log("ViewModle");
}

$(document).ready(function() {
  ko.applyBindings(new ViewModle());

});
