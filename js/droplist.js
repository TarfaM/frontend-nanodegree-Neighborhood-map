function ViewModel(model) {
    this.booleanValue = ko.observable(false);
    this.availableOptioons = ko.observableArray([{
        text: "All",
        key:1,
        details:'place 1',
        id: true
    }, {
        text: "None",
        key:2,
        details:'place 2',
        id: false
    }]);
}

ko.applyBindings(new ViewModel());


// {key:1 , details:'place 1' ,title:'Danube Hypermarket Al Malqa' ,location: {lat: 24.807972, lng: 46.615403}},
// {key:2 , details:'place 2',title:'The Nail Corner ركن الأظافر' ,location: {lat: 24.807018, lng: 46.615768}},
// {key:3 , details:'place 4' ,title:'Tilal AlRiyadh' ,location: {lat: 24.800887, lng: 46.611532}},
// {key:5 , details:'place 5',title:'Tilal AlRiyadh' ,location: {lat: 24.800887, lng: 46.611532}}
// ];
