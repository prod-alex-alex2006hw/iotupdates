var request = require('request');
var Client = require("ibmiotf").IotfDevice;
var Geolocation = require('./geolocation');
var config = require('../config');

var Timer = 3600000/360;

var deviceClient = new Client(config);
deviceClient.connect();

function getGeoData() {
    Geolocation.getGeo(null, function(err, geo) {
        if (err) return err;
        deviceClient.setMaxListeners(deviceClient.getMaxListeners() + 1);
        if(deviceClient.isConnected) {
            var myQosLevel=0;
            var myGeo={ 'lat': geo.lat, 'log' : geo.lng};
            deviceClient.publish("telemetry", "json", JSON.stringify(myGeo), myQosLevel);
//            deviceClient.publish("status", "json", JSON.stringify(geo.time), myQosLevel);
        }
        deviceClient.setMaxListeners(deviceClient.getMaxListeners() - 1);
    });
}

var timerId = setInterval(getGeoData,Timer);


