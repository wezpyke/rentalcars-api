var rentalCars = {};
rentalCars.username = "your_username";
rentalCars.password="your_password";
rentalCars.remoteIp = "remote_ip";

rentalCars.creds = '<Credentials username="' + rentalCars.username + '" password="' + rentalCars.password + '" remoteIp="' + rentalCars.remoteIp + '" />';

rentalCars.url = encodeURI('https://xml.rentalcars.com/service/ServiceRequest.do?serverName=www.rentalcars.com&xml=');

module.exports = rentalCars;
