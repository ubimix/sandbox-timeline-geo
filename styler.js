var data = require('./data.geo.json');
var _ = require('lodash');
var Fs = require('fs');

var GREEN = '#00931c';
var YELLOW = '#dedc1c';
var RED = '#ac0000';

_.each(data.features, function(d){
    d.properties.emitterId = _.uniqueId('em-');
    d.properties.railway;
    var color = GREEN;
    var val = Math.floor(Math.random() * 20) + 1;  
    if (val==4 || val==5)
    	color = YELLOW;
    else if (val == 6)
    	color = RED;
    d.properties['marker-color'] = color;
    d.properties['marker-size'] = 'small';
    //d.properties ['marker-symbol'] = 's';  
});


var str = JSON.stringify({
    type : "FeatureCollection",
    features : data.features
}, null, 2);


Fs.writeFileSync('./data-styled.geo.json', str, 'UTF-8');