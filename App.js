var app = angular.module("weatherApp", []),
    key = 'a28a17a26b3011b477f86a598b7959aa',
    desktop = false;
    mobile = true;

app.controller('weatherController', function ($scope, $http) {

    if (desktop) {
        googleGeo();
    }

    else if (navigator.geolocation) {
            googleGeo();
        
    } else {
        navigator.geolocation.getCurrentPosition(function (position) {
            getWeatherByCord(position.coords.latitude, position.coords.longitude);
        });
    }

    function getWeatherByCord(lat, lon) {
        $http({
            method: 'GET',
            url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric&appid=' + key
        }).then(function (response) {
            console.log(response.data);
            $scope.DataFromLocation = response.data;
            $scope.lastSync = lastSync();

        }, function (error) {

        });
    }

    $scope.search = function () {
        $http({
            method: 'GET',
            url: 'http://api.openweathermap.org/data/2.5/weather?q=' + $scope.location + '&units=metric&appid=' + key
        }).then(function (response) {
            console.log(response.data);
            $scope.DataFromLocation = response.data;
            $scope.location = "";
            document.getElementById('search').blur();
            $scope.lastSync = lastSync();
        });
    };

    function googleGeo() {
        $http({
            method: 'GET',
            url: 'https://maps.googleapis.com/maps/api/browserlocation/json?browser=chromium&sensor=true'
        }).then(function (response) {
            console.log(response.data);
            getWeatherByCord(response.data.location.lat, response.data.location.lng);
        });
    }

    function lastSync() {
        var currentdata = new Date();
        return currentdata.getTime();
    }

});

if(mobile){
    document.addEventListener("deviceready", function(){
        angular.element(document).ready(function(){
            angular.bootstrap(document, ['weatherApp']);
        });
    }, false);
} else{
    angular.elemet(document).ready(function(){
        angular.bootstrap(document, ['weatherApp']);
    });
}