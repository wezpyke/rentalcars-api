/* jslint node: true */
/*global require */
var express = require('express');
var router = express.Router();
var request = require('request');
var parser = require('xml2json');
var rentalCars = require('../config/rentalcars.js');


/* GET API Root. */
router.get('/', function (req, res) {
  res.send('', 403);
});


/* GET countries */
router.get('/countries', function (req, res) {
    var queryString, url;
    queryString = '<PickUpCountryListRQ>' + rentalCars.creds + '</PickUpCountryListRQ>';
    url = rentalCars.url + encodeURI(queryString);
    request(url, {secureProtocol: "SSLv3_method"}, function (error, response, body) {
        var data, json, countryList;

        data = parser.toJson(body);
        json = JSON.parse(data);
        countryList = json.PickUpCountryListRS.CountryList;
        console.log(countryList);
        res.json(countryList);
    });
});


/* GET cities */
router.get('/cities/:country', function (req, res) {
    var queryString, url;
    queryString = '<?xml version="1.0" ?>' +
                        '<PickUpCityListRQ>' + rentalCars.creds +
                          '<Country>' + req.params.country +
                          '</Country>' +
                        '</PickUpCityListRQ>';
    url = rentalCars.url + encodeURI(queryString);
    console.log(url);

    request(url, {secureProtocol: "SSLv3_method"}, function (error, response, body) {
        var data, json, dataToDisplay;

        data = parser.toJson(body);
        json = JSON.parse(data);
        dataToDisplay = json.PickUpCityListRS.CityList;

        res.json(dataToDisplay);
    });
});


/* GET pickUpLocation */
router.get('/pickUpLocation/:country/:city', function (req, res) {
    var queryString, url;
    queryString = '<?xml version="1.0" ?>' +
                        '<PickUpLocationListRQ>' + rentalCars.creds +
                          '<Country>' + req.params.country + '</Country>' +
                          '<City>' + req.params.city + '</City>' +
                        '</PickUpLocationListRQ>';
    url = rentalCars.url + encodeURI(queryString);

    console.log(url);
    request(url, {secureProtocol: "SSLv3_method"}, function (error, response, body) {
        var data, json, dataToDisplay;

        data = parser.toJson(body);
        json = JSON.parse(data);
        dataToDisplay = json.PickUpLocationListRS.LocationList;

        res.json(dataToDisplay);
    });
});


/* GET dropOffCountry */
router.get('/dropOffCountry/:countryName/:cityName/:locationName/:locationID', function (req, res) {
    var queryString, url;
    queryString = '<?xml version="1.0" ?>' +
                        '<DropOffCountryListRQ>' + rentalCars.creds +
                          '<Location country="' + req.params.countryName + '" city="' + req.params.cityName + '">' + req.params.locationName + '</Location>' +
                        '</DropOffCountryListRQ>';
    url = rentalCars.url + encodeURI(queryString);

    console.log(url);
    request(url, {secureProtocol: "SSLv3_method"}, function (error, response, body) {
        var data, json, dataToDisplay;

        data = parser.toJson(body);
        json = JSON.parse(data);
        dataToDisplay = json.DropOffCountryListRS.CountryList;

        res.json(dataToDisplay);
    });

});


/* GET dropOffCity */
router.get('/dropOffCity/:countryName/:cityName/:locationName/:locationID/:dropOffCountryName', function (req, res) {
    var queryString, url;
    queryString = '<?xml version="1.0" ?>' +
                        '<DropOffCityListRQ>' + rentalCars.creds +
                          '<Location country="' + req.params.countryName + '" city="' + req.params.cityName + '">' + req.params.locationName + '</Location>' +
                          '<Country>' + req.params.dropOffCountryName + '</Country>' +
                        '</DropOffCityListRQ>';
    url = rentalCars.url + encodeURI(queryString);

    request(url, {secureProtocol: "SSLv3_method"}, function (error, response, body) {
        var data, json, dataToDisplay;
        data = parser.toJson(body);
        json = JSON.parse(data);
        dataToDisplay = json.DropOffCityListRS.CityList;

        res.json(dataToDisplay);
    });
});


/* GET dropOffLocation */
router.get('/dropOffLocation/:countryName/:cityName/:locationName/:locationID/:dropOffCountryName/:dropOffCityName', function (req, res) {
    var queryString, url;
    queryString = '<?xml version="1.0" ?>' +
                        '<DropOffLocationListRQ>' + rentalCars.creds +
                          '<Location id="' + req.params.locationID + '" country="' + req.params.countryName + '" city="' + req.params.cityName + '">' + req.params.locationName + '</Location>' +
                          '<Country>' + req.params.dropOffCountryName + '</Country>' +
                          '<City>' + req.params.dropOffCityName + '</City>' +
                        '</DropOffLocationListRQ>';
    url = rentalCars.url + encodeURI(queryString);

    request(url, {secureProtocol: "SSLv3_method"}, function (error, response, body) {
        var data, json, dataToDisplay;

        data = parser.toJson(body);
        json = JSON.parse(data);
        dataToDisplay = json.DropOffLocationListRS.LocationList;

        res.json(dataToDisplay);
    });
});


/* GET pickUpOpenTime */
router.get('/pickUpOpenTime/:countryName/:cityName/:locationName/:locationID/:dropOffCountryName/:dropOffCityName/:dropOffLocationID/:pickUpYear/:pickUpMonth/:pickUpDay', function (req, res) {
    var queryString, url;
    queryString = '<?xml version="1.0" ?>' +
                        '<PickUpOpenTimeRQ>' + rentalCars.creds +
                          '<Location id="' + req.params.locationID + '" country="' + req.params.countryName + '" city="' + req.params.cityName + '">' + req.params.locationName + '</Location>' +
                          '<Country>' + req.params.dropOffCountryName + '</Country>' +
                          '<City>' + req.params.dropOffCityName + '</City>' +
                          '<Date year="' + req.params.pickUpYear + '" month="' + req.params.pickUpMonth + '" day="' + req.params.pickUpDay + '"/>' +
                        '</PickUpOpenTimeRQ>';
    url = rentalCars.url + encodeURI(queryString);

    request(url, {secureProtocol: "SSLv3_method"}, function (error, response, body) {
        var data, json, dataToDisplay;

        data = parser.toJson(body);
        json = JSON.parse(data);
        dataToDisplay = json.PickUpOpenTimeRS;

        res.json(dataToDisplay);
    });
});



router.get('/dropOffOpenTime/:countryName/:cityName/:locationName/:locationID/:dropOffCountryName/:dropOffCityName/:dropOffLocationID/:dropOffYear/:dropOffMonth/:dropOffDay', function (req, res) {
    var queryString, url;
    queryString = '<?xml version="1.0" ?>' +
                        '<DropOffOpenTimeRQ>' + rentalCars.creds +
                          '<Location id="' + req.params.locationID + '" country="' + req.params.countryName + '" city="' + req.params.cityName + '">' + req.params.locationName + '</Location>' +
                          '<Country>' + req.params.dropOffCountryName + '</Country>' +
                          '<City>' + req.params.dropOffCityName + '</City>' +
                          '<Date year="' + req.params.dropOffYear + '" month="' + req.params.dropOffMonth + '" day="' + req.params.dropOffDay + '"/>' +
                        '</DropOffOpenTimeRQ>';
    url = rentalCars.url + encodeURI(queryString);

    request(url, {secureProtocol: "SSLv3_method"}, function (error, response, body) {
        var data, json, dataToDisplay;

        console.log("Body", body);
        data = parser.toJson(body, {coerce: true});
        console.log("To JSON: ", data);
        json = JSON.parse(data);
        dataToDisplay = json.DropOffOpenTimeRS;
        console.log(dataToDisplay);
        res.json(dataToDisplay);
    });
});


router.get('/search/:countryName/:cityName/:locationName/:locationID/:dropOffCountryName/:dropOffCityName/:dropOffLocationID/:pickUpYear/:pickUpMonth/:pickUpDay/:pickUpHour/:pickUpMinute/:dropOffYear/:dropOffMonth/:dropOffDay/:dropOffHour/:dropOffMinute/:driverAge', function (req, res) {
    var queryString, url;
    queryString = '<?xml version="1.0" ?>' +
                      '<SearchRQ supplierInfo="true">' + rentalCars.creds +
                        '<PickUp>' +
                          '<Location id="' + req.params.locationID + '"/>' +
                          '<Date year="' + req.params.pickUpYear + '" month="' + req.params.pickUpMonth + '" day="' + req.params.pickUpDay + '" hour="' + req.params.pickUpHour + '" minute="' + req.params.pickUpMinute + '"/>' +
                        '</PickUp>' +
                        '<DropOff>' +
                          '<Location id="' + req.params.dropOffLocationID + '"/>' +
                          '<Date year="' + req.params.dropOffYear + '" month="' + req.params.dropOffMonth + '" day="' + req.params.dropOffDay + '" hour="' + req.params.dropOffHour + '" minute="' + req.params.dropOffMinute + '"/>' +
                        '</DropOff>' +
                        '<DriverAge>' + req.params.driverAge + '</DriverAge>' +
                      '</SearchRQ>';
    url = rentalCars.url + encodeURI(queryString);

    request(url, {secureProtocol: "SSLv3_method"}, function (error, response, body) {
        var data, json, dataToDisplay;

        console.log("Body", body);
        data = parser.toJson(body, {coerce: true});
        console.log("To JSON: ", data);
        json = JSON.parse(data);
        dataToDisplay = json.SearchRS;
        console.log(dataToDisplay);
        res.json(dataToDisplay);
    });
});

module.exports = router;
