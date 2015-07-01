var data = require('./data.geo.json');
var _ = require('lodash');
var Fs = require('fs');

_.each(data.features, function(d){
    d.properties.emitterId = _.uniqueId('em-');
    d.properties.railway;
    d.properties['marker-color'] = '#eee';
    d.properties['marker-size'] = 'medium';
    d.properties ['marker-symbol'] = 'cross';    
});


var str = JSON.stringify({
    type : "FeatureCollection",
    features : data.features
}, null, 2);


Fs.writeFileSync('./data-styled.geo.json', str, 'UTF-8');