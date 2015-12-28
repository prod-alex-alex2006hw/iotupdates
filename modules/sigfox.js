var request = require('request');
var Client = require('ibmiotf');
var Geolocation = require('./geolocation');
var config = require('../config');

var Timer = 3600000/3600;

var deviceClient = new Client.IotfDevice(config);
deviceClient.connect();

function getGeoData() {
    Geolocation.getGeo(null, function(err, geo) {
        if (err) return err;
        deviceClient.setMaxListeners(deviceClient.getMaxListeners() + 1);
        deviceClient.on('connect', function () {
            var myQosLevel=0;
            var myGeo={ 'lat': geo.lat, 'log' : geo.lng};
            deviceClient.publish("telemetry", "json", JSON.stringify(myGeo), myQosLevel);
//            deviceClient.publish("status", "json", JSON.stringify(geo), myQosLevel);
//            console.log(JSON.stringify(myGeo));
        });

        deviceClient.on("error", function (err) {
            console.log("Error : "+err);
        });

    //    var postUrl = 'https://findme.pointlook.com/sigfox';
    //    request.post(
    //        postUrl,
    //        formData,
    //        function (error, response, body) {
    //            if (error && response.statusCode !== 200) {
    //                console.log(error);
    //            }
    //            console.log(Date.now(), body);
    //        }
    //    );

    });
}

var timerId = setInterval(getGeoData,Timer);


