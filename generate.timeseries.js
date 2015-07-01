var data = require('./data.geo.json');
var _ = require('lodash');
var FS = require('fs');

var MIN = 60 * 1000;
var HOUR = 60 * MIN;
var DAY = 24 * HOUR;

var now = new Date().getTime();
now = Math.round(now / HOUR) * HOUR;
var startTime = now - DAY;
var delta = 30 * MIN;

_.each(data.features, function(d){
    d.properties.emitterId = _.uniqueId('em-');
    delete d.properties.railway;
});

var list = generateMultiplePoints(data);
//var list = generateTimeseries(data);

var str = JSON.stringify({
    type : "FeatureCollection",
    features : list
}, null, 2);
FS.writeFileSync('./data-timeseries.geo.json', str, 'UTF-8');
console.log(str);

function generateMultiplePoints(data){
    var list = [];
    var counter = 0;
    for (var time = startTime; time < now; time += delta) {
        _.each(data.features, function(d) {
            d = JSON.parse(JSON.stringify(d));
            list.push(d);
            d.id = 'id-' + (counter++);
            d.properties.time = time;
            var val = parseFloat((Math.random() * 10).toFixed(3));
            d.properties.val = val;
        });
    }
    return list;
}

function generateTimeseries(data){
    var list = [];
    var counter = 0;
    _.each(data.features, function(d) {
        d = JSON.parse(JSON.stringify(d));
        list.push(d);
        d.id = 'id-' + (counter++);
        var state = d.properties.state = {}
        for (var time = startTime; time < now; time += delta) {
            var val = parseFloat((Math.random() * 10).toFixed(3));
            state[time] = val;
//            var str = new Date(time).toISOString();
        }
    });
    return list;
}
