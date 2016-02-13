var fs              = require('fs');
var assert          = require('assert');
var loading         = require('loading-indicator');
var logger          = require('./logger');
var config          = require('../config/api.json');
const child_process = require('child_process');

import { AssertClass } from './AssertClass.js';

var appName = config['app_name'];
var classes = config['classes'];

for (var i = 0; i < classes.length; i++) {
    var klass = classes[i];
    var local = require('../build/' + appName + '/' + klass + '.local.json');
    var parse = require('../build/' + appName + '/' + klass + '.parse.json');
    assert.equal(local.results.length, parse.results.length);
    for (var i = 0; i < local.results.length; i++) {
        AssertClass.verify(local.results[i], parse.results[i]);
    }
}