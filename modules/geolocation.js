var request = require('request');
var exports = module.exports = {};

var cache = {};

module.exports = {
    getGeoStub: function(err, cb) {
                var formData = {
                    lat: 100,
                    lng: 200,
                    time: Math.floor((+new Date()) / 1000)
                }
                cb(err,formData);
            },

    getGeo: function(err, cb) {
        request(
            { method: 'GET'
                , uri: 'http://freegeoip.net/json/'
                , gzip: true
            }
            , function (error, response, body) {
                if (error) return error;
                var geo = JSON.parse(body);
                var station = rssi = snr = avgSignal = 100;
                var formData = {
                    id: geo.ip,
                    time: Math.floor((+new Date()) / 1000),
                    station: station,
                    rssi: rssi,
                    snr: snr,
                    avgSignal: avgSignal,
                    lat: geo.latitude,
                    lng: geo.longitude,
                    country: geo.country_name,
                    country_code: geo.country_code,
                    state: geo.region_name,
                    statecode: geo.region_code,
                    city: geo.city,
                    zipcode: geo.zip_code,
                    timezone: geo.time_zone,
                    metro: geo.metro_code
                };
                cb(err, formData);
            }
        );
    }
};
