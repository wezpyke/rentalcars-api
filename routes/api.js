var express = require('express');
var router = express.Router();
var request = require('request');
var parser = require('xml2json');
var rentalCars = require('../config/rentalcars.js');


/* GET API Root. */
router.get('/', function(req, res) {
  res.send('', 403);
});


/* GET countries */
router.get('/countries', function (req, res) {
    var url = 'http://xml.rentalcars.com/service/ServiceRequest.do?serverName=www.rentalcars.com&xml=%3CPickUpCountryListRQ%3E%3CCredentials%20username=%22' + rentalCars.username + '%22%20password=%22' + rentalCars.password + '%22%20remoteIp=%22' + rentalCars.remoteIp + '%22/%3E%3C/PickUpCountryListRQ%3E';
    request(url, {secureProtocol: "SSLv3_method"}, function (error, response, body) {
        
        var data = parser.toJson(body);
        var json = JSON.parse(data);
        var countryList = json.PickUpCountryListRS.CountryList.Country;
        console.log(countryList);
        res.json(countryList);
    });
});


/* GET cities */
router.get('/cities/:country', function (req, res) {
    var url;
    url = rentalCars.url + encodeURI('<?xml version="1.0" ?><PickUpCityListRQ>' + rentalCars.creds + '<Country>' + req.params.country + '</Country></PickUpCityListRQ>');
    console.log(url);

    request(url, {secureProtocol: "SSLv3_method"}, function (error, response, body) {

        var data = parser.toJson(body);
        var json = JSON.parse(data);
        var dataToDisplay = json.PickUpCityListRS.CityList.City;

        res.json(dataToDisplay);
    });
});


/* GET pickUpLocation */
router.get('/pickUpLocation/:country/:city', function (req, res) {
    var url = rentalCars.url + encodeURI('<?xml version="1.0" ?><PickUpLocationListRQ>' + rentalCars.creds + '<Country>' + req.params.country + '</Country><City>' + req.params.city + '</City></PickUpLocationListRQ>');
    
    console.log(url);
    request(url, {secureProtocol: "SSLv3_method"}, function (error, response, body) {
        
        var data = parser.toJson(body);
        var json = JSON.parse(data);
        var dataToDisplay = json.PickUpLocationListRS.LocationList.Location;

        res.json(dataToDisplay);
    });
});


/* GET dropOffCountry */
router.get('/dropOffCountry/:countryName/:cityName/:locationName/:locationID', function (req, res) {
    var url = rentalCars.url + encodeURI('<?xml version="1.0" ?><DropOffCountryListRQ>' + rentalCars.creds + '<Location country="' + req.params.countryName + '" city="' + req.params.cityName + '">' + req.params.locationName + '</Location></DropOffCountryListRQ>');
    
    console.log(url);
    request(url, {secureProtocol: "SSLv3_method"}, function (error, response, body) {
        var data = parser.toJson(body);
        var json = JSON.parse(data);
        var dataToDisplay = json.DropOffCountryListRS.CountryList.Country;

        res.json(dataToDisplay);
    });

});


/* GET dropOffCity */
router.get('/dropOffCity/:countryName/:cityName/:locationName/:locationID/:dropOffCountryName', function (req, res) {
    var url = rentalCars.url + encodeURI('<?xml version="1.0" ?><DropOffCityListRQ>' + rentalCars.creds + '<Location country="' + req.params.countryName + '" city="' + req.params.cityName + '">' + req.params.locationName + '</Location><Country>' + req.params.dropOffCountryName + '</Country></DropOffCityListRQ>');

    request(url, {secureProtocol: "SSLv3_method"}, function (error, response, body) {
        var data = parser.toJson(body);
        var json = JSON.parse(data);
        var dataToDisplay = json.DropOffCityListRS.CityList.City;

        res.json(dataToDisplay);
    });
});


/* GET dropOffLocation */
router.get('/dropOffLocation/:countryName/:cityName/:locationName/:locationID/:dropOffCountryName/:dropOffCityName', function (req, res) {
    var url = rentalCars.url + encodeURI('<?xml version="1.0" ?><DropOffLocationListRQ>' + rentalCars.creds + '<Location id="' + req.params.locationID + '" country="' + req.params.countryName + '" city="' + req.params.cityName + '">' + req.params.locationName + '</Location><Country>' + req.params.dropOffCountryName + '</Country><City>' + req.params.dropOffCityName + '</City></DropOffLocationListRQ>');

    request(url, {secureProtocol: "SSLv3_method"}, function (error, response, body) {
        var data = parser.toJson(body);
        var json = JSON.parse(data);
        var dataToDisplay = json.DropOffLocationListRS.LocationList.Location;

        res.json(dataToDisplay);
    });
});


/* GET pickUpOpenTime */
router.get('/pickUpOpenTime/:countryName/:cityName/:locationName/:locationID/:dropOffCountryName/:dropOffCityName/:dropOffLocationID', function (req, res) {
    var url = rentalCars.url + encodeURI('<?xml version="1.0" ?><PickUpOpenTimeRQ>' + rentalCars.creds + '<Location id="' + req.params.locationID + '" country="' + req.params.countryName + '" city="' + req.params.cityName + '">' + req.params.locationName + '</Location><Country>' + req.params.dropOffCountryName + '</Country><City>' + req.params.dropOffCityName + '</City><Date year="2014" month="10" day="1"/></PickUpOpenTimeRQ>');

    request(url, {secureProtocol: "SSLv3_method"}, function (error, response, body) {
        var data = parser.toJson(body);
        var json = JSON.parse(data);
        var dataToDisplay = json.PickUpOpenTimeRS.OpenTime;

        res.json(dataToDisplay);
    });
});

module.exports = router;